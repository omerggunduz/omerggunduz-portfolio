import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { Badge } from "@/components/ui/Badge";
import type { PostSummary } from "@/types/sanity";

const typeLabels: Record<PostSummary["postType"], string> = {
  devlog: "Devlog",
  tutorial: "Tutorial",
  blog: "Blog",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Props = { post: PostSummary };

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all hover:border-orange-600/50 hover:shadow-lg hover:shadow-orange-900/20"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-800">
        {post.coverImage ? (
          <SanityImage
            source={post.coverImage}
            alt={post.title}
            width={640}
            height={360}
            className="transition-transform duration-300 group-hover:scale-105"
            fill
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-900">
            <span className="text-xs uppercase tracking-widest text-neutral-700 font-medium">
              {post.postType}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="type">{typeLabels[post.postType]}</Badge>
          {post.publishedAt && (
            <span className="text-xs text-neutral-500">{formatDate(post.publishedAt)}</span>
          )}
        </div>
        <h3 className="font-medium text-white group-hover:text-orange-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-neutral-400 line-clamp-2">{post.excerpt}</p>
        )}
        {post.relatedGame && (
          <p className="mt-auto text-xs text-neutral-500">
            Project: <span className="text-neutral-400">{post.relatedGame.title}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
