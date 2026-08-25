"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { business } from "@/content/business";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { AffordabilityCalculatorContent } from "@/components/sections/AffordabilityCalculator";

const POPUP_KEY = "jsre-affordability-popup-dismissed";

export function AffordabilityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(POPUP_KEY);
    if (dismissed) return;

    const timer = window.setTimeout(() => setOpen(true), 700);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    sessionStorage.setItem(POPUP_KEY, "true");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[170] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="affordability-popup-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/78"
            aria-label="Close affordability calculator"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-gold-border bg-black text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
                  {business.brand}
                </p>
                <h2
                  id="affordability-popup-title"
                  className="mt-3 font-display text-3xl leading-tight sm:text-4xl"
                >
                  Check your affordability
                </h2>
                <GoldDivider className="mx-auto my-5" width="w-16" />
                <p className="mx-auto max-w-md text-sm leading-relaxed text-white/65">
                  Estimate how much home you may qualify for based on Canadian GDS/TDS ratios and the mortgage stress test.
                </p>
              </div>

              <AffordabilityCalculatorContent
                idPrefix="popup-"
                dark
                showHeading={false}
                showWhatsApp={false}
                className="mt-8"
              />

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={close}
                  className="text-xs uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-gold"
                >
                  No thanks
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
