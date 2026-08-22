/**
 * Property listings — DO NOT publish fabricated listings.
 * Add verified properties here when supplied by the client or authorised feed.
 *
 * TODO: Integrate authorised MLS/IDX/DDF/PropTx feed when permissions are granted.
 * Do not claim MLS®, REALTOR®, CREA, TRREB, or PropTx integration until authorised.
 */

export type PropertyStatus = "for-sale" | "for-lease" | "sold" | "leased";
export type PropertySector = "residential" | "commercial";
export type PropertyCategory =
  | "house"
  | "condo"
  | "townhome"
  | "apartment"
  | "office"
  | "retail"
  | "industrial"
  | "land"
  | "mixed-use";

export interface Property {
  slug: string;
  title: string;
  status: PropertyStatus;
  sector: PropertySector;
  category: PropertyCategory;
  area: string;
  address?: string;
  price?: number;
  priceLabel?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  description: string;
  features: string[];
  images: string[];
  coordinates?: { lat: number; lng: number };
  brokerageAttribution?: string;
  isPublished: boolean;
}

/** Verified property data — empty until client supplies listings */
export const properties: Property[] = [];

export function getPublishedProperties(): Property[] {
  return properties.filter((p) => p.isPublished);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug && p.isPublished);
}

export function formatPrice(property: Property): string {
  if (property.priceLabel) return property.priceLabel;
  if (property.price) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(property.price);
  }
  return "Price available on request";
}
