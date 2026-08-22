"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { business, ctaLabels } from "@/content/business";
import { headerNav, isNavGroup, type NavGroup } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isOverlay = isHome && !scrolled;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <>
      <header
        className={cn(
          "z-50 w-full max-w-[100vw] overflow-x-hidden transition-all duration-500",
          isHome && (!mounted || isOverlay)
            ? "fixed inset-x-0 top-0 border-none bg-gradient-to-b from-black/80 via-black/40 to-transparent shadow-none"
            : "sticky top-0 border-b border-gold-border bg-black/95 shadow-lg backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5 md:px-8 md:py-4 lg:grid lg:grid-cols-[200px_1fr_200px] lg:gap-4">
          {/* Logo */}
          <Link href="/" className="relative z-50 shrink-0">
            <Image
              src={business.logo.src}
              alt={business.logo.alt}
              width={160}
              height={200}
              className="h-10 w-auto sm:h-12 md:h-16 lg:h-[72px]"
              priority
            />
          </Link>

          {/* Desktop Nav — centred */}
          <nav
            className="hidden items-center justify-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {headerNav.map((item) =>
              isNavGroup(item) ? (
                <DesktopDropdown
                  key={item.label}
                  group={item}
                  isActive={isActive}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  overlay={isHome && (!mounted || isOverlay)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold xl:px-4 xl:text-xs",
                    isHome && (!mounted || isOverlay) ? "text-white/90" : "text-white/80",
                    isActive(item.href) && "text-gold"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-px bg-gold xl:left-4 xl:right-4"
                    />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* WhatsApp CTA — outline style */}
          <div className="hidden items-center justify-end lg:flex">
            <Link
              href={business.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/80 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold transition-all hover:bg-gold/10 xl:px-5 xl:text-[11px]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {business.whatsapp.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="flex h-full flex-col overflow-y-auto px-6 pb-24 pt-24"
            >
              {headerNav.map((item) =>
                isNavGroup(item) ? (
                  <MobileNavGroup key={item.label} group={item} isActive={isActive} />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "border-b border-white/10 py-4 text-lg uppercase tracking-wider transition-colors hover:text-gold",
                      isActive(item.href) ? "text-gold" : "text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="mt-8">
                <Link
                  href={business.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-gold-gradient py-3.5 text-sm font-semibold uppercase tracking-wider text-black"
                >
                  <MessageCircle className="h-4 w-4" />
                  {ctaLabels.whatsappPrimary}
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopDropdown({
  group,
  isActive,
  openDropdown,
  setOpenDropdown,
  overlay,
}: {
  group: NavGroup;
  isActive: (href: string) => boolean;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
  overlay: boolean;
}) {
  const isGroupActive = group.items.some((i) => isActive(i.href));
  const isOpen = openDropdown === group.label;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(group.label)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-gold xl:px-4 xl:text-xs",
          overlay ? "text-white/90" : "text-white/80",
          isGroupActive && "text-gold"
        )}
        aria-expanded={isOpen}
        onClick={() => setOpenDropdown(isOpen ? null : group.label)}
      >
        {group.label}
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 min-w-[240px] -translate-x-1/2 border border-gold-border bg-black py-2 shadow-xl"
          >
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 transition-colors hover:bg-white/5 hover:text-gold"
              >
                <span className="text-sm text-white">{item.label}</span>
                {item.description && (
                  <span className="mt-0.5 block text-xs text-white/50">{item.description}</span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavGroup({
  group,
  isActive,
}: {
  group: NavGroup;
  isActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-4 text-lg uppercase tracking-wider text-white"
        aria-expanded={expanded}
      >
        {group.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden pl-4"
          >
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block py-3 text-base transition-colors hover:text-gold",
                  isActive(item.href) ? "text-gold" : "text-white/70"
                )}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
