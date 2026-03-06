"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#blog", label: "Blog", id: "blog" },
];

export function SidebarNav() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="mt-12 flex flex-col gap-3">
      {navItems.map(({ href, label, id }) => {
        const isActive = active === id;
        return (
          <Link
            key={href}
            href={href}
            className={`group flex items-center gap-3 text-sm transition-colors ${
              isActive ? "text-orange-400" : "text-neutral-400 hover:text-orange-400"
            }`}
          >
            <span
              className={`h-px transition-all duration-200 ${
                isActive
                  ? "w-12 bg-orange-500"
                  : "w-8 bg-neutral-600 group-hover:w-12 group-hover:bg-orange-500"
              }`}
            />
            <span className="tracking-widest uppercase text-xs font-medium">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
