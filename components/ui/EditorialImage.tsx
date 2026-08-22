"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  overlay?: boolean;
}

export function EditorialImage({
  src,
  alt,
  className,
  priority = false,
  aspectRatio = "aspect-[4/3]",
  overlay = false,
}: EditorialImageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden", aspectRatio, className)}
      initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
    </motion.div>
  );
}
