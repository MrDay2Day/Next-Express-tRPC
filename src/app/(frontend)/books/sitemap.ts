"use server";

import { createCaller_next } from "@/app/(server)/api/trpc/_trpc_functions";
import { BASE_URL } from "../../../../types/constants/general";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const caller = createCaller_next({
    req: null,
    res: null,
    authHeader: undefined,
  });
  const count = await caller.books.getCount();

  const result: { id: number }[] = [];
  for (let i = 0; i < count.count; i++) {
    result.push({ id: i });
  }
  return result;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const caller = createCaller_next({
    req: null,
    res: null,
    authHeader: undefined,
  });

  const count = await caller.books.getCount();

  const booksDatabase = await caller.books.fetchAll({ count: count.count });

  // Google's limit is 50,000 URLs per sitemap
  const products = booksDatabase;
  return products.map((_product, index) => {
    return {
      url: `${BASE_URL}/books/${index}`,
      lastModified: new Date(Date.now() + (id * (index * index) + 1) * 23163),
    };
  });
}
