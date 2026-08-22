import Image from "next/image";
import { type Property, formatPrice } from "@/data/properties";
import { ctaLabels, legal } from "@/content/business";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

interface Props {
  property: Property;
}

export function PropertyDetailContent({ property }: Props) {
  const statusLabel = {
    "for-sale": "For Sale",
    "for-lease": "For Lease",
    sold: "Sold",
    leased: "Leased",
  }[property.status];

  const heroImage = property.images[0] ?? images.hero.properties;

  return (
    <>
      <PageHero
        eyebrow={`${statusLabel} • ${property.sector}`}
        title={property.title}
        description={property.address ? `${property.address}, ${property.area}` : property.area}
        image={heroImage}
        imageAlt={property.title}
        breadcrumbs={[
          { label: "Properties", href: "/properties" },
          { label: property.title },
        ]}
        compact
      />

      {property.images.length > 1 && (
        <section className="bg-black py-2 md:py-4">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {property.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img}
                    alt={`${property.title} — image ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-warm-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GoldDivider className="mb-6" width="w-20" />
              <p className="leading-relaxed text-muted-text">{property.description}</p>

              {property.features.length > 0 && (
                <>
                  <h2 className="mt-8 font-display text-2xl">Features</h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-text">
                        <span className="h-1 w-1 bg-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="mt-8 text-xs text-muted-text">{legal.propertyDisclaimer}</p>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-gold-border bg-white p-6">
                <p className="font-display text-3xl">{formatPrice(property)}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  {property.bedrooms && (
                    <div className="flex justify-between">
                      <dt className="text-muted-text">Bedrooms</dt>
                      <dd>{property.bedrooms}</dd>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex justify-between">
                      <dt className="text-muted-text">Bathrooms</dt>
                      <dd>{property.bathrooms}</dd>
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex justify-between">
                      <dt className="text-muted-text">Square feet</dt>
                      <dd>{property.sqft.toLocaleString()}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-text">Type</dt>
                    <dd className="capitalize">{property.category.replace("-", " ")}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <WhatsAppCTA
                    label={ctaLabels.whatsappProperty}
                    message={`Hi Jasmeet, I'd like to inquire about: ${property.title} (${property.area})`}
                    className="w-full text-center"
                  />
                </div>
                {property.brokerageAttribution && (
                  <p className="mt-4 text-xs text-muted-text">{property.brokerageAttribution}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
