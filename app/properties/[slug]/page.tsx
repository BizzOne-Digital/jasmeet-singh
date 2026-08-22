import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { getPropertyBySlug, getPublishedProperties } from "@/data/properties";
import { PropertyDetailContent } from "@/components/pages/PropertyDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };
  return createPageMetadata({
    title: property.title,
    description: property.description.slice(0, 160),
    path: `/properties/${slug}`,
  });
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();
  return <PropertyDetailContent property={property} />;
}
