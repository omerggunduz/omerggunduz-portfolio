import { PostCard } from "./PostCard";
import type { PostSummary } from "@/types/sanity";

type Props = { posts: PostSummary[] };

export function PostGrid({ posts }: Props) {
  if (!posts.length) {
    return (
      <p className="py-20 text-center text-neutral-500">No posts found.</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
