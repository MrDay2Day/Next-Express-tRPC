import "server-only";

import { BASE_URL } from "../../types/constants/general";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: "/private/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
