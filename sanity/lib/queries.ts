import { groq } from "next-sanity";

// ─── Fragment helpers ────────────────────────────────────────────────────────

export const gameSummaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  coverImage,
  engine,
  status,
  tags,
  featured,
  releaseDate
`;

export const postSummaryFields = groq`
  _id,
  title,
  "slug": slug.current,
  postType,
  publishedAt,
  coverImage,
  excerpt,
  "relatedGame": relatedGame->{ _id, title, "slug": slug.current },
  "categories": categories[]->{ _id, title, "slug": slug.current }
`;

// ─── Games ───────────────────────────────────────────────────────────────────

export const allGamesQuery = groq`
  *[_type == "game"] | order(releaseDate desc) {
    ${gameSummaryFields}
  }
`;

export const featuredGamesQuery = groq`
  *[_type == "game" && featured == true] | order(releaseDate desc)[0...3] {
    ${gameSummaryFields}
  }
`;

export const gameBySlugQuery = groq`
  *[_type == "game" && slug.current == $slug][0] {
    ${gameSummaryFields},
    description,
    screenshots,
    links,
    "devlogs": *[_type == "post" && references(^._id) && postType == "devlog"] | order(publishedAt desc) {
      ${postSummaryFields}
    }
  }
`;

export const gameSlugsQuery = groq`
  *[_type == "game" && defined(slug.current)] { "slug": slug.current }
`;

// ─── Posts ───────────────────────────────────────────────────────────────────

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    ${postSummaryFields}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...5] {
    ${postSummaryFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postSummaryFields},
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;
