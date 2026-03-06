import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { SanityImage } from "@/components/ui/SanityImage";
import { getHighlighter } from "@/lib/shiki";

type CodeBlock = {
  _type: "code";
  code: string;
  language?: string;
  filename?: string;
};

type ImageBlock = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
};

async function CodeBlock({ value }: { value: CodeBlock }) {
  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(value.code ?? "", {
    lang: value.language ?? "text",
    theme: "github-dark",
  });

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-neutral-800">
      {value.filename && (
        <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-2">
          <span className="text-xs text-neutral-400">{value.filename}</span>
        </div>
      )}
      <div
        className="overflow-x-auto text-sm [&>pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: PortableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code: CodeBlock as any,
    image: ({ value }: { value: ImageBlock }) => (
      <figure className="my-8">
        <div className="overflow-hidden rounded-lg">
          <SanityImage
            source={value}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className="w-full"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-neutral-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-400 underline underline-offset-2 hover:text-orange-300"
      >
        {children}
      </a>
    ),
  },
};

type Props = { value: PortableTextBlock[] };

export function PortableTextRenderer({ value }: Props) {
  return (
    <div className="prose prose-invert prose-neutral prose-headings:text-white prose-a:text-orange-400 prose-code:text-orange-300 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
      <PortableText value={value} components={components} />
    </div>
  );
}
