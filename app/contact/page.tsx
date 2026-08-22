import { createPageMetadata } from "@/lib/metadata";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Jasmeet Singh directly via WhatsApp, phone, email, or Instagram. No forms — just personal communication.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
