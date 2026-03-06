import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SanityImage } from "@/components/ui/SanityImage";
import { Badge } from "@/components/ui/Badge";
import { sanityFetch } from "@/sanity/lib/fetch";
import { gameBySlugQuery, gameSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { GameDetail } from "@/types/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: gameSlugsQuery,
      tags: ["game"],
    });
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await sanityFetch<GameDetail | null>({
    query: gameBySlugQuery,
    params: { slug },
    tags: ["game"],
  });
  if (!game) return {};
  return {
    title: game.title,
    description: game.shortDescription,
    openGraph: {
      title: game.title,
      description: game.shortDescription,
      images: game.coverImage
        ? [{ url: urlFor(game.coverImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

const statusLabels: Record<string, string> = {
  released: "Released",
  "in-progress": "In Progress",
  prototype: "Prototype",
  "on-hold": "On Hold",
};

const engineLabels: Record<string, string> = {
  unity: "Unity",
  unreal: "Unreal Engine",
  godot: "Godot",
  gamemaker: "GameMaker",
  other: "Other",
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = await sanityFetch<GameDetail | null>({
    query: gameBySlugQuery,
    params: { slug },
    tags: ["game"],
  });

  if (!game) notFound();

  const hasDevlogs = game.devlogs && game.devlogs.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-400 transition-colors mb-10"
      >
        <span aria-hidden>←</span> Projects
      </Link>
      <div className="flex gap-16">
        {/* ── Main column ── */}
        <div className="flex-1 min-w-0">
          {/* Cover */}
          <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800">
            {game.coverImage ? (
              <SanityImage
                source={game.coverImage}
                alt={game.title}
                width={1200}
                height={675}
                priority
                fill
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-neutral-700 font-medium">
                  {game.engine ? engineLabels[game.engine] : game.title}
                </span>
              </div>
            )}
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="mb-3 text-4xl font-bold text-orange-500">{game.title}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="status">{statusLabels[game.status] ?? game.status}</Badge>
              {game.engine && (
                <Badge variant="outline">{engineLabels[game.engine] ?? game.engine}</Badge>
              )}
              {game.releaseDate && (
                <Badge variant="default">
                  {new Date(game.releaseDate).getFullYear()}
                </Badge>
              )}
            </div>
            <p className="text-neutral-400">{game.shortDescription}</p>
          </div>

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
          )}

          {/* Description */}
          {game.description && (
            <div className="mb-10 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <p className="whitespace-pre-wrap text-neutral-300 leading-relaxed">
                {game.description}
              </p>
            </div>
          )}

          {/* Links */}
          {game.links && game.links.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-3">
              {game.links.map((link) => (
                <a
                  key={link._key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-orange-700/50 bg-orange-600/10 px-4 py-2 text-sm font-medium text-orange-300 transition-colors hover:bg-orange-600/20 hover:text-orange-200"
                >
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          )}

          {/* Screenshots */}
          {game.screenshots && game.screenshots.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Screenshots</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {game.screenshots.map((screenshot, i) => (
                  <div key={i} className="relative aspect-video overflow-hidden rounded-lg">
                    <SanityImage
                      source={screenshot}
                      alt={`${game.title} screenshot ${i + 1}`}
                      width={800}
                      height={450}
                      fill
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Devlogs sidebar ── */}
        {hasDevlogs && (
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-4">
                Devlogs
              </p>
              <div className="flex flex-col gap-1">
                {game.devlogs!.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-0.5 rounded-md px-3 py-2.5 -mx-3 transition-colors hover:bg-neutral-800/50"
                  >
                    {post.publishedAt && (
                      <span className="text-xs text-neutral-500">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    <span className="text-sm text-neutral-300 group-hover:text-orange-400 transition-colors leading-snug">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
