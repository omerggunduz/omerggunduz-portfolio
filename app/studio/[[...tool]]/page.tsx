"use client";

export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";
import config from "@/sanity/sanity.config";

const NextStudio = dynamicImport(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
      Loading Studio…
    </div>
  ),
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
