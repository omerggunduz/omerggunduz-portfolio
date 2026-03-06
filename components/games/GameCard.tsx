import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { Badge } from "@/components/ui/Badge";
import type { GameSummary } from "@/types/sanity";

const statusLabels: Record<GameSummary["status"], string> = {
  released: "Released",
  "in-progress": "In Progress",
  prototype: "Prototype",
  "on-hold": "On Hold",
};

const engineLabels: Record<NonNullable<GameSummary["engine"]>, string> = {
  unity: "Unity",
  unreal: "Unreal",
  godot: "Godot",
  gamemaker: "GameMaker",
  other: "Other",
};

type Props = { game: GameSummary };

export function GameCard({ game }: Props) {
  return (
    <Link
      href={`/projects/${game.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all hover:border-orange-600/50 hover:shadow-lg hover:shadow-orange-900/20"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-800">
        {game.coverImage ? (
          <SanityImage
            source={game.coverImage}
            alt={game.title}
            width={640}
            height={360}
            className="transition-transform duration-300 group-hover:scale-105"
            fill
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-900">
            <span className="text-xs uppercase tracking-widest text-neutral-700 font-medium">
              {game.engine ? engineLabels[game.engine] : "No Image"}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <Badge variant="status">{statusLabels[game.status]}</Badge>
        </div>
        <p className="text-sm text-neutral-400 line-clamp-2">{game.shortDescription}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {game.engine && (
            <Badge variant="outline">{engineLabels[game.engine]}</Badge>
          )}
          {game.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
