import type { MetadataRoute } from "next";
import { getAllMeta } from "@/lib/articles";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllMeta().map((a) => ({
    url: `${site.url}/articles/${a.slug}/`,
    lastModified: a.date || new Date().toISOString(),
  }));
  return [{ url: `${site.url}/`, lastModified: new Date().toISOString() }, ...articles];
}
