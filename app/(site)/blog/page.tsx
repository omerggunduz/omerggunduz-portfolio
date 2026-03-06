import type { Metadata } from "next";
import { Suspense } from "react";
import { PostFilter } from "@/components/blog/PostFilter";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsQuery } from "@/sanity/lib/queries";
import type { PostSummary } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Blog",
  description: "Devlogs, tutorials, and thoughts from Omer Gunduz.",
};

export default async function BlogPage() {
  const posts = await sanityFetch<PostSummary[]>({
    query: allPostsQuery,
    tags: ["post"],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-orange-500">Blog</h1>
        <p className="mt-3 text-neutral-400">
          Documenting the journey — devlogs, breakdowns, and lessons from building games.
        </p>
      </div>
      <Suspense>
        <PostFilter posts={posts} />
      </Suspense>
    </div>
  );
}
