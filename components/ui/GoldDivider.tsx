import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  width?: string;
}

export function GoldDivider({ className, width = "w-16" }: GoldDividerProps) {
  return <div className={cn("h-px bg-gold-gradient", width, className)} />;
}
