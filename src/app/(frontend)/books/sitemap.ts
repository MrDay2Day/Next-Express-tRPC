"use server";

import { booksDatabase } from "@/app/(server)/api/trpc/_trpc_functions/books/books";
import { BASE_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const count = booksDatabase.length;

  const result: { id: number }[] = [];
  for (let i = 0; i < count; i++) {
    result.push({ id: i });
  }
  console.log({ result });
  return result;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const products = booksDatabase;
  return products.map((product, index) => {
    console.log({ id, index });
    return {
      url: `${BASE_URL}/books/${index}`,
      lastModified: new Date(Date.now() + (id * (index * index) + 1) * 23163),
    };
  });
}
