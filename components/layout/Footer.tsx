import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Ömer Gökalp Gündüz. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <Link href="/projects" className="hover:text-neutral-300 transition-colors">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-neutral-300 transition-colors">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
