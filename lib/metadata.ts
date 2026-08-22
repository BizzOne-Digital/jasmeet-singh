import type { Metadata } from "next";
import { business } from "@/content/business";

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${business.siteUrl}${path}`;
  const fullTitle = path === "/" || path === ""
    ? `${business.brand} | ${business.tagline}`
    : `${title} | ${business.brand}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: business.brand,
      locale: "en_CA",
      type: "website",
      images: [
        {
          url: `${business.siteUrl}${business.logo.src}`,
          width: business.logo.width,
          height: business.logo.height,
          alt: business.logo.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${business.siteUrl}${business.logo.src}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const defaultMetadata: Metadata = createPageMetadata({
  title: business.brand,
  description: `Strategic real estate guidance for buying, selling, leasing, and investing across Ontario. ${business.tagline}`,
  path: "/",
});
