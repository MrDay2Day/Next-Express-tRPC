"use server";

import { BASE_URL } from "../../types/constants/general";
import type { MetadataRoute } from "next";

const domain = BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${domain}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${domain}/place`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      //   images: ["https://example.com/image.jpg"],
      //   videos: [
      //     {
      //       title: "example",
      //       thumbnail_loc: "https://example.com/image.jpg",
      //       description: "this is the description",
      //     },
      //   ],
    },
    {
      url: `${domain}/hoot-page`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/docs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/client-page`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/map`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
