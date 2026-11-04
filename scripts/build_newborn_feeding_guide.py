"""Build the Latched Beginnings "Newborn Feeding Guide: The First 6 Weeks" PDF.

Draft for Dr. Culotta's clinical review. Run: python3 scripts/build_newborn_feeding_guide.py (needs weasyprint). Brand: Gelasio headings, Montserrat body,
coral #E0949B / deep coral #C46E78 / blush #FDEFF1 / charcoal #2D2D2D / gold #C9A86A.
"""
import sys
from pathlib import Path
from weasyprint import HTML

HERE = Path(__file__).parent
SITE = HERE.parent
IMG = SITE / "public/images"
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else SITE / "public/downloads/newborn-feeding-guide.pdf"

CSS = f"""
@font-face {{ font-family: 'Gelasio'; src: url('file://{HERE}/guide-fonts/Gelasio.ttf'); font-weight: 400 700; }}
@font-face {{ font-family: 'Montserrat'; src: url('file://{HERE}/guide-fonts/Montserrat.ttf'); font-weight: 100 900; }}
@page {{ size: Letter; margin: 0.7in 0.75in 0.75in;
  @bottom-left {{ content: "Latched Beginnings | Newborn Feeding Guide"; font-family: Montserrat; font-size: 7pt; color: #6F6A67; letter-spacing: 0.4pt; }}
  @bottom-right {{ content: counter(page); font-family: Montserrat; font-size: 7pt; color: #6F6A67; }} }}
@page cover {{ margin: 0; @bottom-left {{ content: none }} @bottom-right {{ content: none }} }}
body {{ font-family: Montserrat; font-size: 9.6pt; line-height: 1.55; color: #2D2D2D; margin: 0; }}
h1, h2, h3 {{ font-family: Gelasio; font-weight: 600; color: #1F1F1F; margin: 0; }}
h2 {{ font-size: 23pt; line-height: 1.15; margin: 2pt 0 6pt; }}
h3 {{ font-size: 12.5pt; margin: 14pt 0 5pt; }}
p {{ margin: 0 0 7pt; }}
.eyebrow {{ font-size: 7pt; font-weight: 700; letter-spacing: 1.8pt; text-transform: uppercase; color: #C46E78; }}
.lede {{ font-size: 10.6pt; color: #4A4643; padding-bottom: 9pt; border-bottom: 1pt solid #E0949B; margin-bottom: 11pt; }}
.page {{ page-break-before: always; }}
.box {{ background: #FDEFF1; border-radius: 10pt; padding: 10pt 13pt; margin: 8pt 0; }}
.box.gold {{ background: #FBF6EC; border-left: 3pt solid #C9A86A; border-radius: 0 10pt 10pt 0; }}
.box strong {{ color: #C46E78; }}
ul {{ margin: 3pt 0 6pt; padding-left: 13pt; }} li {{ margin: 2.5pt 0; }}
ul.check {{ list-style: none; padding-left: 0; }}
ul.check li {{ padding-left: 15pt; position: relative; }}
ul.check li:before {{ content: ""; position: absolute; left: 0; top: 4pt; width: 7pt; height: 7pt; border-radius: 50%; background: #E0949B; }}
.cols {{ display: flex; gap: 14pt; }} .cols > div {{ flex: 1; }}
table {{ width: 100%; border-collapse: collapse; font-size: 8.8pt; margin: 6pt 0; }}
th {{ text-align: left; font-weight: 700; font-size: 7.8pt; color: #C46E78; border-bottom: 1.2pt solid #E0949B; padding: 5pt; }}
td {{ padding: 5pt; border-bottom: 0.5pt solid #F3DADD; vertical-align: top; }}
.week {{ border-left: 3pt solid #E0949B; padding: 2pt 0 2pt 11pt; margin: 9pt 0; }}
.week b.t {{ font-family: Gelasio; font-size: 12pt; display: block; color: #1F1F1F; margin-bottom: 2pt; }}
.log td, .log th {{ height: 17pt; text-align: center; border: 0.5pt solid #F0CCD1; }}
.log th {{ background: #FDEFF1; color: #C46E78; }}
.note {{ font-size: 7.6pt; color: #6F6A67; margin-top: 8pt; }}
.cover {{ page: cover; height: 11in; background: #FDEFF1; position: relative; text-align: center; }}
.cover .band {{ height: 0.22in; background: #E0949B; }}
.cover .logo {{ width: 2.3in; margin-top: 1.0in; }}
.cover h1 {{ font-size: 40pt; line-height: 1.08; margin-top: 0.45in; }}
.cover .sub {{ font-family: Gelasio; font-style: italic; color: #C46E78; font-size: 17pt; margin-top: 8pt; }}
.cover .rule {{ width: 0.9in; height: 1.2pt; background: #C9A86A; margin: 0.32in auto 0.28in; }}
.cover .desc {{ font-size: 10.5pt; color: #4A4643; width: 4.6in; margin: 0 auto; }}
.cover .by {{ position: absolute; bottom: 0.7in; width: 100%; font-size: 9pt; color: #4A4643; line-height: 1.7; }}
.cover .by b {{ font-family: Gelasio; font-size: 12pt; color: #1F1F1F; }}
.letter {{ display: flex; gap: 20pt; align-items: flex-start; }}
.letter img {{ width: 2.1in; border-radius: 12pt; }}
.sign {{ font-family: Gelasio; font-style: italic; font-size: 14pt; color: #C46E78; margin-top: 8pt; }}
.back {{ text-align: center; }}
.back .cta {{ background: #E0949B; color: #fff; border-radius: 22pt; padding: 9pt 22pt; display: inline-block; font-weight: 700; font-size: 10.5pt; margin: 10pt 0; text-decoration: none; }}
"""

LOG_ROWS = "".join(
    f"<tr><td>Day {d}</td><td></td><td></td><td></td><td></td><td></td></tr>" for d in range(1, 15)
)

HTML_BODY = f"""
<div class="cover"><div class="band"></div>
<img class="logo" src="file://{IMG}/brand/logo.png">
<h1>Newborn<br>Feeding Guide</h1>
<div class="sub">The First 6 Weeks</div>
<div class="rule"></div>
<div class="desc">Feeding rhythms, latch basics, what is normal, and when to reach out for support, in calm and practical language.</div>
<div class="by"><b>Dr. Kacie Culotta, DMD</b><br>Dentist and lactation counselor<br>Latched Beginnings, Austin, Texas</div>
</div>

<div class="page">
<div class="eyebrow">Welcome</div><h2>A Note From Dr. Culotta</h2>
<div class="letter">
<div>
<p>Congratulations on your new baby. If you are reading this at 3 a.m. with a baby on your chest, you are in good company.</p>
<p>Feeding is something you and your baby learn together. Some days it clicks right away, and some days it feels like a puzzle. Both are normal. My goal with this guide is to give you a clear picture of what the first six weeks usually look like, so you can relax into what is going well and recognize early when something deserves a closer look.</p>
<p>As a dentist and lactation counselor, I spend my days helping families with feeding, from the first latch to tongue tie questions. I have seen how much calmer parents feel when they know what to expect. You know your baby better than anyone. Trust that instinct, and use this guide as a friendly companion along the way.</p>
<div class="sign">Dr. Kacie Culotta</div>
<p style="font-size:8.5pt;color:#6F6A67">Founder, Latched Beginnings</p>
</div>
<img src="file://{IMG}/dr-kacie-portrait.jpg">
</div>
<div class="box"><strong>How to use this guide.</strong> Read it once now, then keep it handy. The feeding and diaper log on page 10 is designed to print and stick on the fridge for the first two weeks.</div>
<p class="note">This guide is for general education and does not replace care from your baby's pediatrician or your own provider. If you are ever worried about your baby, call your pediatrician.</p>
</div>

<div class="page">
<div class="eyebrow">The big picture</div><h2>What to Expect, Week by Week</h2>
<p class="lede">Every baby is different, but most follow a similar arc. Feeds start frequent and a little unpredictable, then settle into a rhythm as you both gain confidence.</p>
<div class="week"><b class="t">Days 1 to 4: Learning together</b>Your baby's tummy is tiny, and early milk (colostrum) is small in volume and rich in nutrition. Expect frequent feeds, sleepy feeds, and lots of skin to skin time. Some weight loss in the first days is expected. Your milk volume usually increases between days 2 and 5.</div>
<div class="week"><b class="t">Week 1 to 2: Finding your footing</b>Most babies feed about 8 to 12 times in 24 hours. Many regain their birth weight by around 2 weeks. Your pediatrician will check weight at early visits, which is a reassuring way to confirm feeding is on track.</div>
<div class="week"><b class="t">Weeks 2 to 4: Growth spurts</b>Many babies have a growth spurt in this window and may want to feed almost constantly for a day or two, often in the evening. This is called cluster feeding, and it is how babies signal your body to make more milk.</div>
<div class="week"><b class="t">Weeks 4 to 6: A rhythm emerges</b>Feeds often become more efficient and predictable. Another growth spurt around 6 weeks is common. Comfort for you and steady growth for your baby are the signs that things are going well.</div>
<div class="box gold"><strong>The most important rule:</strong> feed your baby, not the clock. Watching your baby's cues works better than a strict schedule in these early weeks.</div>
</div>

<div class="page">
<div class="eyebrow">Rhythm</div><h2>How Often and How Much</h2>
<p class="lede">In the early weeks, frequent feeding is not a sign that something is wrong. It is how babies grow and how milk supply is built.</p>
<div class="cols">
<div><h3>Early hunger cues</h3><ul class="check"><li>Stirring and waking</li><li>Rooting: turning the head with mouth open</li><li>Hands to mouth, sucking on fists</li><li>Lip smacking or tongue movements</li></ul></div>
<div><h3>Late hunger cues</h3><ul class="check"><li>Fussing that builds</li><li>Frantic head movements</li><li>Crying, which is a late sign</li></ul><p style="font-size:8.6pt">If your baby is already crying, calm them first with skin to skin or gentle rocking, then offer a feed.</p></div>
</div>
<h3>A typical day in the first weeks</h3>
<table><thead><tr><th>What</th><th>What is common</th></tr></thead><tbody>
<tr><td>Feeds in 24 hours</td><td>About 8 to 12, sometimes more during growth spurts</td></tr>
<tr><td>Time between feeds</td><td>Usually 1.5 to 3 hours, counted from the start of one feed to the start of the next</td></tr>
<tr><td>Length of a feed</td><td>Varies widely. Let your baby finish the first side before offering the second</td></tr>
<tr><td>Night feeds</td><td>Expected and important in the early weeks</td></tr>
<tr><td>Sleepy newborns</td><td>In the first weeks, many pediatricians suggest waking a baby who sleeps much longer than 3 to 4 hours. Ask yours what is right for your baby</td></tr>
</tbody></table>
<h3>Signs of a satisfying feed</h3>
<ul class="check"><li>You can hear or see swallowing, especially early in the feed</li><li>Your baby's hands and body relax as the feed goes on</li><li>Your baby comes off the breast on their own and seems content</li><li>Feeding is comfortable for you</li></ul>
</div>

<div class="page">
<div class="eyebrow">Reassurance</div><h2>Is My Baby Getting Enough?</h2>
<p class="lede">What goes in must come out. Diapers are one of the simplest ways to know feeding is going well, especially in the first week.</p>
<table><thead><tr><th>Baby's age</th><th>Wet diapers in 24 hours</th><th>Dirty diapers</th></tr></thead><tbody>
<tr><td>Day 1</td><td>At least 1</td><td>Dark, sticky meconium</td></tr>
<tr><td>Day 2</td><td>At least 2</td><td>Dark meconium</td></tr>
<tr><td>Day 3</td><td>At least 3</td><td>Changing to green or brown</td></tr>
<tr><td>Day 4</td><td>At least 4</td><td>Turning yellow</td></tr>
<tr><td>Day 5 to 6 weeks</td><td>6 or more, pale and mild</td><td>Usually 3 or more yellow, seedy stools a day in the early weeks</td></tr>
</tbody></table>
<h3>Weight</h3>
<p>Most newborns lose some weight in the first few days, and most regain their birth weight by about 2 weeks. Your pediatrician will track this at early visits. Steady weight gain after that is one of the clearest signs that feeding is working.</p>
<div class="box"><strong>Call your pediatrician the same day if</strong> your baby has fewer wet diapers than expected, dark or orange urine after day 3, no dirty diapers after day 4, is too sleepy to wake for feeds, or looks more yellow. For any baby under 3 months, a temperature of 100.4&deg;F or higher is a reason to call right away.</div>
</div>

<div class="page">
<div class="eyebrow">Latch</div><h2>Latch Basics</h2>
<p class="lede">A comfortable, deep latch helps your baby feed efficiently and protects you from soreness. Small adjustments can make a big difference.</p>
<h3>Setting up</h3>
<ul class="check"><li>Bring your baby to you, rather than leaning toward your baby</li><li>Tummy to tummy, with ear, shoulder, and hip in a line</li><li>Nose lined up with the nipple, so your baby tips their head back slightly to latch</li><li>Wait for a wide open mouth, like a yawn, then bring your baby in close</li></ul>
<div class="cols">
<div><h3>A deep latch usually looks like</h3><ul class="check"><li>Lips flanged outward, like a fish</li><li>More of the areola covered by the lower lip than the upper</li><li>Chin pressed into the breast, nose free</li><li>Rhythmic sucking with pauses to swallow</li></ul></div>
<div><h3>A shallow latch may look like</h3><ul class="check"><li>Pinching or sharp pain that continues</li><li>Lips tucked in</li><li>Clicking or smacking sounds</li><li>A nipple that looks flattened or creased after feeds</li></ul></div>
</div>
<div class="box"><strong>Comfort is the goal.</strong> Some tenderness in the first days is common, but feeding should not hurt throughout the feed. If it does, gently break the latch with a clean finger at the corner of your baby's mouth and try again.</div>
</div>

<div class="page">
<div class="eyebrow">Clarity</div><h2>What's Normal, and What's Worth a Check</h2>
<p class="lede">Many things that feel worrying are a normal part of the newborn weeks. A few patterns are worth talking through with a feeding professional.</p>
<div class="cols">
<div><h3>Usually normal</h3><ul class="check"><li>Some nipple tenderness in the first days that eases</li><li>Cluster feeding, especially in the evening</li><li>Sleepy feeds in the first week</li><li>Small spit ups after feeds</li><li>Hiccups, sneezes, and noisy newborn breathing</li><li>Feeding more during growth spurts</li></ul></div>
<div><h3>Worth a check</h3><ul class="check"><li>Pain that lasts through feeds or beyond the first week</li><li>Clicking or smacking sounds while nursing</li><li>Milk dribbling from the corners of the mouth</li><li>Lipstick shaped or creased nipples after feeds</li><li>Very long feeds that leave your baby still hungry</li><li>Frequent gas, reflux, or fussiness at the breast</li><li>Slow weight gain</li></ul></div>
</div>
<div class="box gold"><strong>One sign on its own is rarely the whole story.</strong> A few of these together is a good reason to reach out to a lactation professional or to us. Getting help early often makes feeding easier sooner.</div>
</div>

<div class="page">
<div class="eyebrow">Ties</div><h2>Could It Be a Tongue Tie?</h2>
<p class="lede">Tongue, lip, and cheek (buccal) ties are bands of tissue that can limit how freely the tongue or lips move. Sometimes they affect feeding, and often they do not.</p>
<p>At Latched Beginnings we take a conservative, whole baby approach. <b>Not every tie needs a release.</b> What matters is function: how your baby's tongue and lips move during feeding, and how feeding is going for both of you. Appearance alone does not tell the full story.</p>
<h3>Signs that a feeding evaluation may help</h3>
<ul class="check"><li>Several of the "worth a check" signs on the previous page</li><li>Ongoing nipple pain despite latch adjustments</li><li>A baby who struggles to stay latched or tires quickly at the breast</li><li>Feeding concerns that have not improved with lactation support</li></ul>
<div class="box"><strong>Want a closer look?</strong> Our free Oral Tie Symptoms Checklist walks through the most common signs in plain language. Find it at latchedbeginnings.com/resources/oral-tie-symptoms-checklist, or bring your questions to a consultation.</div>
<h3>What an evaluation with Dr. Culotta includes</h3>
<ul class="check"><li>A conversation about your feeding history and goals</li><li>A gentle assessment of your baby's oral function</li><li>A clear explanation of what we see, and every option, including when no release is needed</li></ul>
</div>

<div class="page">
<div class="eyebrow">Support</div><h2>When to Reach Out</h2>
<p class="lede">Asking for help early is a sign of a well cared for baby, not a sign that something is wrong.</p>
<table><thead><tr><th>Who to call</th><th>When</th></tr></thead><tbody>
<tr><td><b>Your pediatrician, right away</b></td><td>A temperature of 100.4&deg;F or higher in a baby under 3 months, a baby who is hard to wake, trouble breathing, or signs of dehydration</td></tr>
<tr><td><b>Your pediatrician, same day</b></td><td>Fewer wet or dirty diapers than expected, worsening yellow skin, or concerns about weight</td></tr>
<tr><td><b>A lactation professional</b></td><td>Latch pain, worries about milk supply, or questions about positioning and pumping</td></tr>
<tr><td><b>Latched Beginnings</b></td><td>Feeding challenges that point to how your baby's tongue or lips move, or questions about tongue, lip, or buccal ties</td></tr>
</tbody></table>
<div class="box"><strong>You are not alone in this.</strong> Feeding struggles are common, solvable, and never a reflection of how much you love your baby.</div>
</div>

<div class="page">
<div class="eyebrow">Printable</div><h2>Feeding and Diaper Log</h2>
<p class="lede">For the first two weeks. Tally each feed and diaper, and bring this log to your pediatrician visits.</p>
<table class="log"><thead><tr><th>Day</th><th>Feeds</th><th>Wet diapers</th><th>Dirty diapers</th><th>Weight check</th><th>Notes</th></tr></thead><tbody>{LOG_ROWS}</tbody></table>
</div>

<div class="page back">
<img src="file://{IMG}/brand/logo.png" style="width:2in;margin-top:0.9in">
<h2 style="margin-top:0.4in">We're Here When You Need Us</h2>
<p style="width:4.8in;margin:8pt auto 0">If feeding feels harder than it should, Dr. Culotta and our team offer gentle, evidence minded feeding evaluations for babies and families in Austin and beyond.</p>
<a class="cta" href="https://www.latchedbeginnings.com/contact?utm_source=newborn-feeding-guide&amp;utm_medium=pdf&amp;utm_campaign=lead-magnet#appointment">Schedule a Consultation</a>
<p style="margin-top:10pt;line-height:1.9"><b>(512) 814-7480</b><br>1701 Simond Ave, Suite 107A, Austin, Texas<br>latchedbeginnings.com</p>
<p class="note" style="width:4.8in;margin:0.6in auto 0">This guide is for general education and does not replace individualized care from your pediatrician or provider. In an emergency, call 911.</p>
</div>
"""

HTML(string=f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{HTML_BODY}</body></html>").write_pdf(OUT)
print("wrote", OUT)
