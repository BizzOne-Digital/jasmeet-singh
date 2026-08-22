import { createPageMetadata } from "@/lib/metadata";
import { AreasPageContent } from "@/components/pages/AreasPageContent";

export const metadata = createPageMetadata({
  title: "Ontario Areas Served",
  description: "Residential and commercial real estate services across Ontario — Toronto, Mississauga, Vaughan, and beyond.",
  path: "/areas",
});

export default function AreasPage() {
  return <AreasPageContent />;
}
