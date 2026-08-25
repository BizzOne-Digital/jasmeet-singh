"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { business } from "@/content/business";
import { RooflineDraw } from "@/components/motion/GoldLine";

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const duration = isMobile ? 2400 : 2000;

    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    onComplete();
  };

  const skip = () => {
    setShow(false);
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black px-6 safe-top safe-bottom"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Brand introduction"
        >
          <button
            onClick={skip}
            className="absolute right-4 top-4 z-10 min-h-[44px] min-w-[44px] px-3 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-gold focus-visible:text-gold md:right-6 md:top-6"
          >
            Skip
          </button>

          <RooflineDraw className="mb-5 h-14 w-40 max-w-[70vw] sm:h-16 sm:w-48" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Image
              src={business.logo.src}
              alt={business.logo.alt}
              width={180}
              height={225}
              priority
              className="h-auto w-32 max-w-[65vw] sm:w-40 md:w-52"
            />
          </motion.div>

          <motion.p
            className="mt-4 max-w-xs text-center font-display text-base italic text-gold sm:max-w-sm sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            {business.tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
