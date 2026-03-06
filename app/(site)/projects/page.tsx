import type { Metadata } from "next";
import { GameGrid } from "@/components/games/GameGrid";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allGamesQuery } from "@/sanity/lib/queries";
import type { GameSummary } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all projects by Ömer Gökalp Gündüz.",
};

export default async function ProjectsPage() {
  const games = await sanityFetch<GameSummary[]>({
    query: allGamesQuery,
    tags: ["game"],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-orange-500">Projects</h1>
        <p className="mt-3 text-neutral-400">
          Game prototypes and experiments — built while learning Unreal Engine and game systems development.
        </p>
      </div>
      <GameGrid games={games} />
    </div>
  );
}
