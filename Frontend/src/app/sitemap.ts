import type { MetadataRoute } from "next";

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://greatmurangacommunityrun.co.ke")
    .trim()
    .replace(/\/$/, "");

const routes = ["", "about", "registration", "timeline", "admin"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: route ? `${siteUrl}/${route}` : `${siteUrl}/`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
