"use client";

import Link from "next/link";
import { Phone, Instagram, MessageCircle } from "lucide-react";
import { business } from "@/content/business";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 w-full max-w-[100vw] border-t border-gold-border bg-black/95 backdrop-blur-md md:hidden safe-bottom">
      <div className="grid grid-cols-3">
        <Link
          href={business.phone.href}
          className="flex flex-col items-center gap-1 py-3 text-white/80 transition-colors hover:text-gold active:text-gold"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider">Call</span>
        </Link>
        <Link
          href={business.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-gold-border py-3 text-gold transition-colors hover:text-bright-gold active:text-bright-gold"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider">WhatsApp</span>
        </Link>
        <Link
          href={business.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-white/80 transition-colors hover:text-gold active:text-gold"
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-wider">Instagram</span>
        </Link>
      </div>
    </div>
  );
}
