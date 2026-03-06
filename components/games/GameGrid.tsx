import { GameCard } from "./GameCard";
import type { GameSummary } from "@/types/sanity";

type Props = { games: GameSummary[] };

export function GameGrid({ games }: Props) {
  if (!games.length) {
    return (
      <p className="py-20 text-center text-neutral-500">No games found yet. Check back soon!</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
}
