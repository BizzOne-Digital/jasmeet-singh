"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { business } from "@/content/business";

export function AnnouncementBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="safe-top relative z-50 w-full max-w-[100vw] overflow-hidden bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 text-xs sm:px-5 md:px-8">
        <p className="hidden truncate uppercase tracking-[0.15em] text-white/70 sm:block">
          Serving Clients Across Ontario
        </p>
        <p className="truncate uppercase tracking-[0.15em] text-white/70 sm:hidden">
          Ontario-wide
        </p>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href={business.phone.href}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Phone className="h-3 w-3" aria-hidden="true" />
            <span className="hidden md:inline">{business.phone.display}</span>
          </Link>
          <Link
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-gold"
          >
            <Instagram className="h-3.5 w-3.5" />
          </Link>
          <Link
            href={business.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition-colors hover:text-gold"
          >
            <MessageCircle className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
