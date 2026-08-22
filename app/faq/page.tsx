import { createPageMetadata } from "@/lib/metadata";
import { FAQPageContent } from "@/components/pages/FAQPageContent";

export const metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers to common questions about buying, selling, leasing, and investing in Ontario real estate with Jasmeet Singh.",
  path: "/faq",
});

export default function FAQPage() {
  return <FAQPageContent />;
}
