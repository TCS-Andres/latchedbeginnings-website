/**
 * Generate Latched Beginnings brand assets from the source SVGs/logo:
 *   - src/app/icon.png        (512, transparent pink mark) -> browser tab favicon
 *   - src/app/apple-icon.png  (180, white mark on coral)   -> iOS home screen
 *   - src/app/favicon.ico     (16/32/48 multi-size)         -> legacy favicon
 *   - public/images/brand/lb-icon.png (1024 transparent)    -> reusable square mark
 *   - public/og-image.jpg     (1200x630 social share card)
 *
 * Deterministic: uses rsvg-convert (vector raster) + sharp (compose) only.
 * Run from the repo root:  node scripts/gen-brand-assets.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...s) => path.join(root, ...s);
const tmp = mkdtempSync(path.join(tmpdir(), "lb-assets-"));

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// Render a source SVG to a high-res transparent PNG buffer at a given width.
function renderSvg(svgPath, width) {
  const out = path.join(tmp, `r-${width}-${path.basename(svgPath)}.png`);
  execFileSync("rsvg-convert", ["-w", String(width), svgPath, "-o", out]);
  return readFileSync(out);
}

// Fit a transparent mark into a square canvas with even padding on all sides.
async function squareMark(srcBuf, size, padFrac, bg = TRANSPARENT) {
  const inner = Math.round(size * (1 - 2 * padFrac));
  const fitted = await sharp(srcBuf)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: fitted, gravity: "center" }])
    .png()
    .toBuffer();
}

async function main() {
  const pinkBuf = renderSvg(p("public/images/brand/lb-icon-pink.svg"), 1024);
  const whiteBuf = renderSvg(p("public/images/brand/lb-icon-white.svg"), 1024);

  // 1. Reusable 1024 transparent square mark.
  await sharp(await squareMark(pinkBuf, 1024, 0.08))
    .png()
    .toFile(p("public/images/brand/lb-icon.png"));

  // 2. Browser favicon (transparent pink mark).
  await sharp(await squareMark(pinkBuf, 512, 0.1)).toFile(p("src/app/icon.png"));

  // 3. Apple touch icon: white mark on a warm coral gradient (iOS ignores alpha).
  const appleSize = 180;
  const appleBg = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${appleSize}" height="${appleSize}">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ec9d86"/><stop offset="1" stop-color="#d2745a"/>
        </linearGradient></defs>
        <rect width="${appleSize}" height="${appleSize}" fill="url(#g)"/>
      </svg>`,
    ),
  )
    .png()
    .toBuffer();
  const whiteFitted = await squareMark(whiteBuf, appleSize, 0.2);
  await sharp(appleBg)
    .composite([{ input: whiteFitted, gravity: "center" }])
    .png()
    .toFile(p("src/app/apple-icon.png"));

  // 4. Multi-size .ico from the transparent pink mark.
  const icoSizes = await Promise.all(
    [16, 32, 48].map((s) => squareMark(pinkBuf, s, 0.06)),
  );
  writeFileSync(p("src/app/favicon.ico"), await pngToIco(icoSizes));

  // 5. Social share card (1200x630).
  const logoB64 = readFileSync(p("public/images/brand/logo.png")).toString("base64");
  const W = 1200,
    H = 630;
  const logoW = 540,
    logoH = Math.round(logoW * (781 / 1563)); // preserve 1563x781 aspect
  const logoX = Math.round((W - logoW) / 2),
    logoY = 96;
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fffaf7"/><stop offset="1" stop-color="#fdf0ec"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <circle cx="1140" cy="-40" r="240" fill="#e8967a" opacity="0.10"/>
    <circle cx="70" cy="640" r="220" fill="#e8967a" opacity="0.10"/>
    <rect x="0" y="0" width="${W}" height="10" fill="#e8967a"/>
    <image x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${logoB64}" xmlns:xlink="http://www.w3.org/1999/xlink"/>
    <text x="${W / 2}" y="468" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="48" fill="#2d2d2d">Healthy Beginnings That Last a Lifetime</text>
    <text x="${W / 2}" y="528" text-anchor="middle" font-family="Avenir, 'Avenir Next', Helvetica, Arial, sans-serif" font-size="27" letter-spacing="0.6" fill="#6f6a67">Gentle Tongue-Tie &amp; Lactation Care in Austin, TX</text>
  </svg>`;
  const ogPath = path.join(tmp, "og.png");
  writeFileSync(path.join(tmp, "og.svg"), og);
  execFileSync("rsvg-convert", [
    "-w", String(W), "-h", String(H),
    path.join(tmp, "og.svg"), "-o", ogPath,
  ]);
  await sharp(ogPath)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(p("public/og-image.jpg"));

  console.log("Brand assets generated:");
  for (const f of [
    "public/images/brand/lb-icon.png",
    "src/app/icon.png",
    "src/app/apple-icon.png",
    "src/app/favicon.ico",
    "public/og-image.jpg",
  ]) {
    const { size } = (await import("node:fs")).statSync(p(f));
    console.log(`  ${f}  (${(size / 1024).toFixed(1)} KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
