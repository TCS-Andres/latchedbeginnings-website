import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { formatDate, type BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(210,116,90,0.55)]">
      <Link href={`/blog/${post.slug}`} className="block">
        <Photo
          src={`/images/blog/${post.slug}.jpg`}
          alt={post.title}
          slot={post.topic}
          aspect="aspect-[16/10]"
          shape="soft"
          className="rounded-none"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-stone">
          <span className="rounded-full bg-blush px-3 py-1 font-medium text-coral-deep">
            {post.topic}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg leading-snug text-ink">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-coral-deep"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-blush-200 pt-4">
          <span className="text-xs text-stone">{formatDate(post.date)}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral-deep transition-colors hover:text-coral"
            aria-label={`Read ${post.title}`}
          >
            Read
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
