import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) return highlighter;

  highlighter = await createHighlighter({
    themes: ["github-dark"],
    langs: [
      "typescript",
      "javascript",
      "csharp",
      "bash",
      "json",
      "html",
      "css",
      "glsl",
      "gdscript",
    ],
  });

  return highlighter;
}
