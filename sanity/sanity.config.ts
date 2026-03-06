import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { game } from "./schemas/game";
import { post } from "./schemas/post";
import { category } from "./schemas/category";

export default defineConfig({
  name: "default",
  title: "Omer Gunduz Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: {
    types: [game, post, category],
  },
});
