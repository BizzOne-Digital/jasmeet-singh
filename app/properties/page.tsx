import { createPageMetadata } from "@/lib/metadata";
import { PropertiesPageContent } from "@/components/pages/PropertiesPageContent";

export const metadata = createPageMetadata({
  title: "Properties & Opportunities",
  description:
    "Browse residential and commercial property opportunities across Ontario. Current listings available by request.",
  path: "/properties",
});

export default function PropertiesPage() {
  return <PropertiesPageContent />;
}
