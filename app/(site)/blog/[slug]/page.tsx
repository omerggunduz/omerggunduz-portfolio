import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SanityImage } from "@/components/ui/SanityImage";
import { Badge } from "@/components/ui/Badge";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { PostDetail } from "@/types/sanity";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: postSlugsQuery,
      tags: ["post"],
    });
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<PostDetail | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
  });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

const typeLabels: Record<string, string> = {
  devlog: "Devlog",
  tutorial: "Tutorial",
  blog: "Blog",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<PostDetail | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post"],
  });

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      {/* Meta */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Badge variant="type">{typeLabels[post.postType] ?? post.postType}</Badge>
        {post.publishedAt && (
          <time className="text-sm text-neutral-500" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {post.relatedGame && (
          <Link
            href={`/projects/${post.relatedGame.slug}`}
            className="text-sm text-neutral-500 hover:text-orange-400 transition-colors"
          >
            Project: <span className="text-orange-400">{post.relatedGame.title}</span>
          </Link>
        )}
      </div>

      {/* Title */}
      <h1 className="mb-4 text-4xl font-bold leading-tight text-orange-500 sm:text-5xl">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="mb-8 text-lg text-neutral-400 leading-relaxed">{post.excerpt}</p>
      )}

      {/* Cover */}
      <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800">
        {post.coverImage ? (
          <SanityImage
            source={post.coverImage}
            alt={post.title}
            width={1200}
            height={675}
            priority
            fill
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs uppercase tracking-widest text-neutral-700 font-medium">
              {typeLabels[post.postType]}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      {post.body && <PortableTextRenderer value={post.body} />}

      {/* Footer */}
      <div className="mt-16 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-orange-400 transition-colors"
        >
          <span aria-hidden>←</span> Back to Blog
        </Link>
      </div>
    </article>
  );
}
