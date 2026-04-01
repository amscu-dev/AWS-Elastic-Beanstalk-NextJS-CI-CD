import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/Helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const routes = ["", "/about", "/counter", "/portfolio"];

  const allRoutes = [...routes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
