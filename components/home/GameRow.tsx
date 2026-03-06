import Link from "next/link";
import type { GameSummary } from "@/types/sanity";

interface GameRowProps {
  game: GameSummary;
}

export function GameRow({ game }: GameRowProps) {
  const year = game.releaseDate
    ? new Date(game.releaseDate).getFullYear()
    : game.status === "in-progress"
      ? "WIP"
      : "—";

  return (
    <Link
      href={`/projects/${game.slug}`}
      className="group flex gap-4 items-start rounded-md px-4 py-4 -mx-4 transition-all hover:bg-neutral-800/50 border-l-2 border-transparent hover:border-orange-500"
    >
      {/* Year */}
      <span className="w-10 shrink-0 pt-0.5 text-xs text-neutral-500 font-mono">
        {year}
      </span>

      {/* Title + description + tags */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium group-hover:text-orange-400 transition-colors">
          {game.title}
        </p>
        {game.shortDescription && (
          <p className="mt-0.5 text-sm text-neutral-400 line-clamp-1">
            {game.shortDescription}
          </p>
        )}
        {game.tags && game.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engine */}
      {game.engine && (
        <span className="shrink-0 mt-0.5 px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-400 capitalize">
          {game.engine}
        </span>
      )}
    </Link>
  );
}
