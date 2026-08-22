"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-gold-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-gold focus-visible:text-gold"
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg md:text-xl">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gold transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-muted-text">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
