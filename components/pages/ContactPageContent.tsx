import Link from "next/link";
import { Phone, Mail, Instagram, MessageCircle, MapPin } from "lucide-react";
import { business } from "@/content/business";
import { images } from "@/content/pages";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";

const contactCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "The fastest way to start a conversation about your real estate goals.",
    href: business.whatsapp.url,
    label: "Message on WhatsApp",
    primary: true,
    external: true,
  },
  {
    icon: Phone,
    title: "Call",
    description: business.phone.display,
    href: business.phone.href,
    label: `Call ${business.phone.display}`,
    primary: false,
    external: false,
  },
  {
    icon: Mail,
    title: "Email",
    description: business.email.display,
    href: business.email.href,
    label: "Send an email",
    primary: false,
    external: false,
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: business.instagram.handle,
    href: business.instagram.url,
    label: "Follow on Instagram",
    primary: false,
    external: true,
  },
];

export function ContactPageContent() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let's talk about your next move."
        description="Reach out directly — no forms, just personal communication."
        image={images.hero.contact}
        imageAlt="Keys and property — contact Jasmeet Singh"
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="bg-warm-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {contactCards.map((card, i) => (
              <AnimatedReveal key={card.title} delay={i * 0.1}>
                <Link
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className={`group flex flex-col border p-8 transition-all hover:shadow-lg ${
                    card.primary
                      ? "border-gold bg-black text-white hover:border-bright-gold md:col-span-2 md:flex-row md:items-center md:gap-8"
                      : "border-gold-border bg-white hover:border-gold"
                  }`}
                >
                  <card.icon
                    className={`h-8 w-8 ${card.primary ? "text-gold" : "text-gold"}`}
                    aria-hidden="true"
                  />
                  <div className={card.primary ? "mt-4 md:mt-0" : "mt-4"}>
                    <h2 className="font-display text-2xl">{card.title}</h2>
                    <p className={`mt-2 text-sm ${card.primary ? "text-white/70" : "text-muted-text"}`}>
                      {card.description}
                    </p>
                    <span className="mt-4 inline-block text-sm uppercase tracking-wider text-gold group-hover:underline">
                      {card.label} →
                    </span>
                  </div>
                </Link>
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal delay={0.3}>
            <div className="mt-12 border border-gold-border bg-ivory p-8 text-center md:p-12">
              <MapPin className="mx-auto h-6 w-6 text-gold" aria-hidden="true" />
              <p className="mt-4 font-display text-xl">Service area: {business.serviceArea}</p>
              <p className="mt-2 text-sm text-muted-text">{business.brokerage.display}</p>
              <p className="mt-4 text-sm text-muted-text">{business.availability}</p>
            </div>
          </AnimatedReveal>
        </div>
      </section>
    </>
  );
}
