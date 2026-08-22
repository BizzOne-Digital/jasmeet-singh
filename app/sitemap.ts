import type { MetadataRoute } from "next";
import { business } from "@/content/business";
import { getPublishedProperties } from "@/data/properties";

const staticRoutes = [
  "",
  "/about",
  "/properties",
  "/residential",
  "/commercial",
  "/buyers",
  "/sellers",
  "/leasing",
  "/investments",
  "/areas",
  "/testimonials",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = business.siteUrl;

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const propertyEntries = getPublishedProperties().map((p) => ({
    url: `${baseUrl}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...propertyEntries];
}
