import type { PortableTextBlock } from "@portabletext/react";

export type SanitySlug = { current: string };

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
  caption?: string;
};

export type CategorySummary = {
  _id: string;
  title: string;
  slug: string;
};

export type GameSummary = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage?: SanityImage;
  engine?: "unity" | "unreal" | "godot" | "gamemaker" | "other";
  status: "in-progress" | "released" | "prototype" | "on-hold";
  tags?: string[];
  featured?: boolean;
  releaseDate?: string;
};

export type GameLink = {
  _key: string;
  label: string;
  url: string;
};

export type GameDetail = GameSummary & {
  description?: string;
  screenshots?: SanityImage[];
  links?: GameLink[];
  devlogs?: PostSummary[];
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  postType: "devlog" | "tutorial" | "blog";
  publishedAt?: string;
  coverImage?: SanityImage;
  excerpt?: string;
  relatedGame?: { _id: string; title: string; slug: string } | null;
  categories?: CategorySummary[];
};

export type PostDetail = PostSummary & {
  body?: PortableTextBlock[];
};
