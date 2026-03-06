import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allGamesQuery, recentPostsQuery } from "@/sanity/lib/queries";
import type { GameSummary, PostSummary } from "@/types/sanity";
import { GameRow } from "@/components/home/GameRow";
import { SidebarNav } from "@/components/home/SidebarNav";

export default async function HomePage() {
  const [games, posts] = await Promise.all([
    sanityFetch<GameSummary[]>({ query: allGamesQuery, tags: ["game"] }),
    sanityFetch<PostSummary[]>({ query: recentPostsQuery, tags: ["post"] }),
  ]);

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:gap-4 px-6 lg:px-12">
      {/* ── Left Sidebar ── */}
      <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[340px] lg:flex-none flex flex-col justify-between py-16 lg:py-24">
        {/* Top block */}
        <div>
          <div className="mb-8 mx-auto lg:mx-0 w-fit rounded-2xl border-2 border-orange-500 p-0.5">
            <Image
              src="/images/profile.png"
              alt="Ömer Gökalp Gündüz"
              width={116}
              height={116}
              className="rounded-2xl object-cover grayscale"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-white">Ömer Gökalp Gündüz</h1>
          <h2 className="mt-2 text-xl font-medium text-neutral-400">
            Game Systems Developer
            <br />
            &amp; Embedded Engineer
          </h2>
          <p className="mt-4 text-sm text-neutral-400 max-w-xs leading-relaxed">
            Solo dev exploring Unreal Engine — building game systems, learning
            Unreal C++, and sharing the journey. 10 years of embedded software
            engineering behind me.
          </p>

          {/* Section nav */}
          <SidebarNav />
        </div>

        {/* Social links */}
        <div className="flex gap-4 mt-12 lg:mt-0">
          <a
            href="https://linkedin.com/in/omerggunduz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-500 hover:text-orange-400 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:omerggunduz@gmail.com"
            aria-label="Email"
            className="text-neutral-500 hover:text-orange-400 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </aside>

      {/* ── Right Content ── */}
      <main className="flex-1 py-16 lg:py-24 space-y-32">
        {/* About */}
        <section id="about">
          <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-6">
            About
          </p>
          <div className="space-y-4 text-neutral-400 text-sm leading-relaxed max-w-2xl">
            <p>
              I&apos;m a solo developer working primarily in Unreal Engine,
              building and studying game systems — things like interaction,
              inventory, and core gameplay mechanics. I haven&apos;t shipped a
              commercial project yet, but that&apos;s the point: this is a
              learning journey, documented in public.
            </p>
            <p>
              Most of my Unreal work has been in Blueprints, and I&apos;m
              currently learning Unreal&apos;s C++ layer to implement systems
              that go beyond what Blueprints alone can cleanly handle. I also
              dabble in Unity when it suits the experiment.
            </p>
            <p>
              By trade, I&apos;m a software engineer with 10 years of experience
              in embedded systems. That background gives me a solid foundation
              in low-level thinking and system design — which I&apos;m now
              channeling into game development. If you work in games and find
              this interesting, I&apos;d love to connect.
            </p>
          </div>
        </section>

        {/* Games */}
        <section id="projects">
          <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-6">
            Projects
          </p>

          {games.length > 0 ? (
            <div className="flex flex-col">
              {games.slice(0, 3).map((game) => (
                <GameRow key={game._id} game={game} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-600 italic">
              No projects yet — check back soon.
            </p>
          )}

          <div className="mt-8">
            <Link
              href="/projects"
              className="text-sm text-neutral-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1"
            >
              View all projects
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Blog */}
        <section id="blog">
          <p className="text-xs uppercase tracking-widest text-orange-500 font-semibold mb-6">
            Blog
          </p>

          {posts.length > 0 ? (
            <div className="flex flex-col">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 items-start rounded-md px-4 py-4 -mx-4 transition-all hover:bg-neutral-800/50 border-l-2 border-transparent hover:border-orange-500"
                >
                  <span className="w-24 shrink-0 pt-0.5 text-xs text-neutral-500 font-mono">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "—"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium group-hover:text-orange-400 transition-colors">
                      {post.title}
                    </p>
                    {post.excerpt && (
                      <p className="mt-0.5 text-sm text-neutral-400 line-clamp-1">{post.excerpt}</p>
                    )}
                  </div>
                  <span className="shrink-0 mt-0.5 px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-400 capitalize">
                    {post.postType}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-600 italic">No posts yet — check back soon.</p>
          )}

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm text-neutral-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1"
            >
              View all posts
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
