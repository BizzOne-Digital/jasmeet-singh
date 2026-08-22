import { createPageMetadata } from "@/lib/metadata";
import { AboutPageContent } from "@/components/pages/AboutPageContent";

export const metadata = createPageMetadata({
  title: "About Jasmeet Singh",
  description:
    "Learn about Jasmeet Singh — a client-first real estate professional serving Ontario with residential and commercial expertise.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageContent />;
}
