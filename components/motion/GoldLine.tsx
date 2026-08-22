"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GoldLineProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  animate?: boolean;
}

export function GoldLine({ className = "", direction = "horizontal", animate = true }: GoldLineProps) {
  const prefersReducedMotion = useReducedMotion();

  if (direction === "vertical") {
    return (
      <motion.div
        className={`w-px bg-gold-gradient ${className}`}
        initial={animate && !prefersReducedMotion ? { scaleY: 0 } : { scaleY: 1 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
      />
    );
  }

  return (
    <motion.div
      className={`h-px bg-gold-gradient ${className}`}
      initial={animate && !prefersReducedMotion ? { scaleX: 0 } : { scaleX: 1 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0 }}
    />
  );
}

/** Roofline-inspired SVG path animation */
export function RooflineDraw({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M10 45 L100 10 L190 45"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut" }}
      />
      <motion.path
        d="M100 10 L100 35"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 1.2, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8E6B2E" />
          <stop offset="50%" stopColor="#E3C06F" />
          <stop offset="100%" stopColor="#A77B32" />
        </linearGradient>
      </defs>
    </svg>
  );
}
