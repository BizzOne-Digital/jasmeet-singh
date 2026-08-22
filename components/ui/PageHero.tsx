"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  dark?: boolean;
  children?: React.ReactNode;
  className?: string;
  breadcrumbs?: { label: string; href?: string }[];
  compact?: boolean;
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  dark = true,
  children,
  className,
  breadcrumbs,
  compact = false,
  align = "left",
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const isCentered = align === "center";

  return (
    <section
      className={cn(
        "relative flex max-w-[100vw] items-end overflow-hidden",
        compact ? "min-h-[32vh] md:min-h-[36vh]" : "min-h-[48vh] md:min-h-[56vh]",
        dark ? "bg-black text-white" : "bg-ivory text-black",
        className
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35 md:via-black/75 md:to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-soft-black" />
      )}

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="absolute inset-x-0 top-0 z-20 px-4 pt-3 sm:px-5 md:px-8 md:pt-4">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs items={breadcrumbs} className="text-white/55" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative z-10 w-full",
          breadcrumbs && breadcrumbs.length > 0 ? "pt-10 md:pt-12" : "pt-4 md:pt-6"
        )}
      >
        <motion.div
          className={cn(
            "mx-auto max-w-7xl px-4 pb-10 sm:px-5 sm:pb-12 md:px-8 md:pb-16",
            isCentered && "text-center"
          )}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <p
              className={cn(
                "mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold md:text-xs",
                isCentered && "mx-auto"
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "break-words font-display text-3xl leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl",
              isCentered ? "mx-auto max-w-3xl" : "max-w-4xl"
            )}
          >
            {title}
          </h1>
          <GoldDivider
            className={cn("my-5 md:my-6", isCentered && "mx-auto")}
            width="w-20"
          />
          {description && (
            <p
              className={cn(
                "text-base leading-relaxed text-white/78 md:text-lg",
                isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"
              )}
            >
              {description}
            </p>
          )}
          {children && (
            <div
              className={cn(
                "mt-7 flex flex-wrap gap-4",
                isCentered && "justify-center"
              )}
            >
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface ServiceLinkHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href: string;
  ctaLabel?: string;
}

export function ServiceLinkCard({
  eyebrow,
  title,
  description,
  href,
  ctaLabel = "Learn more",
}: ServiceLinkHeroProps) {
  return (
    <Link
      href={href}
      className="group block border border-gold-border bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-lg md:p-8"
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</span>
      )}
      <h3 className="mt-2 font-display text-2xl md:text-3xl">{title}</h3>
      {description && (
        <p className="mt-3 leading-relaxed text-muted-text">{description}</p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-gold transition-all group-hover:gap-2">
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
