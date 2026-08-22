import { createPageMetadata } from "@/lib/metadata";
import { TestimonialsPageContent } from "@/components/pages/TestimonialsPageContent";

export const metadata = createPageMetadata({
  title: "Client Experiences",
  description: "Client testimonials and experiences with Jasmeet Singh Real Estate. Real reviews to be shared once provided.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return <TestimonialsPageContent />;
}
