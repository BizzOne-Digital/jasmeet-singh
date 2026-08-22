import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";
import { business } from "@/content/business";
import { footerLinks } from "@/content/navigation";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full max-w-[100vw] overflow-x-hidden bg-black text-white pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={business.logo.src}
              alt={business.logo.alt}
              width={200}
              height={250}
              className="h-auto w-40 md:w-48"
            />
            <p className="mt-4 font-display text-lg italic text-gold">
              {business.tagline}
            </p>
            <p className="mt-2 text-sm text-white/50">{business.brokerage.display}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href={business.phone.href} className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {business.phone.display}
                </Link>
              </li>
              <li>
                <Link href={business.email.href} className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {business.email.display}
                </Link>
              </li>
              <li>
                <Link href={business.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {business.instagram.handle}
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/40">Serving {business.serviceArea}</p>
          </div>
        </div>

        <GoldDivider className="my-10" width="w-full" />

        <div className="flex flex-col gap-4 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {business.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/30">
          {business.brokerage.disclosure}
        </p>
      </div>
    </footer>
  );
}
