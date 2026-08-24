import { createPageMetadata } from "@/lib/metadata";
import { ContactPageContent } from "@/components/pages/ContactPageContent";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Jasmeet Singh via the inquiry form, WhatsApp, phone, or email.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
