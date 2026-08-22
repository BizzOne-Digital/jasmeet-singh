import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { type Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const statusLabel = {
    "for-sale": "For Sale",
    "for-lease": "For Lease",
    sold: "Sold",
    leased: "Leased",
  }[property.status];

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group block overflow-hidden border border-gold-border bg-white transition-all hover:border-gold hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ivory text-muted-text">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 bg-black/80 px-3 py-1 text-xs uppercase tracking-wider text-gold">
          {statusLabel}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-gold">{property.sector}</p>
        <h3 className="mt-1 font-display text-xl">{property.title}</h3>
        <p className="mt-1 text-sm text-muted-text">{property.area}</p>
        <p className="mt-3 font-medium">{formatPrice(property)}</p>
      </div>
    </Link>
  );
}

/** Client-side favourite toggle — convenience feature using localStorage */
export function FavouriteButton({ slug }: { slug: string }) {
  return (
    <button
      aria-label="Save to favourites"
      className="rounded-full border border-gold-border p-2 transition-colors hover:border-gold hover:text-gold"
      data-slug={slug}
    >
      <Heart className="h-4 w-4" />
    </button>
  );
}
