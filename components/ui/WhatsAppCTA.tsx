"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getWhatsAppHref } from "@/lib/whatsapp";

interface WhatsAppCTAProps {
  label?: string;
  message?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
}

export function WhatsAppCTA({
  label = "Start on WhatsApp",
  message,
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
}: WhatsAppCTAProps) {
  const prefersReducedMotion = useReducedMotion();
  const href = getWhatsAppHref(message);

  const variants = {
    primary: "bg-gold-gradient text-black hover:brightness-110",
    secondary: "bg-black text-white hover:bg-charcoal",
    outline: "border border-gold text-gold hover:bg-gold/10",
    ghost: "text-gold hover:text-bright-gold underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.div
      whileHover={magnetic && !prefersReducedMotion ? { scale: 1.02 } : {}}
      whileTap={magnetic && !prefersReducedMotion ? { scale: 0.98 } : {}}
      className="inline-block"
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
          variants[variant],
          sizes[size],
          className
        )}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {label}
      </Link>
    </motion.div>
  );
}
