import "server-only";
import { client } from "./client";

type FetchOptions<Q extends Record<string, unknown>> = {
  query: string;
  params?: Q;
  tags?: string[];
};

export async function sanityFetch<T, Q extends Record<string, unknown> = Record<string, unknown>>({
  query,
  params = {} as Q,
  tags = [],
}: FetchOptions<Q>): Promise<T> {
  const isDev = process.env.NODE_ENV === "development";
  return client.fetch<T>(query, params, {
    next: {
      tags,
      revalidate: isDev ? 0 : false,
    },
  });
}
