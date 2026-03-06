"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PostGrid } from "./PostGrid";
import type { PostSummary } from "@/types/sanity";

type PostType = "all" | "devlog" | "tutorial" | "blog";

const filters: { value: PostType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "devlog", label: "Devlogs" },
  { value: "tutorial", label: "Tutorials" },
  { value: "blog", label: "Blog" },
];

type Props = { posts: PostSummary[] };

export function PostFilter({ posts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeType = (searchParams.get("type") ?? "all") as PostType;

  const filtered =
    activeType === "all" ? posts : posts.filter((p) => p.postType === activeType);

  function setFilter(type: PostType) {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeType === value
                ? "border border-orange-500 text-orange-400"
                : "border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <PostGrid posts={filtered} />
    </div>
  );
}
