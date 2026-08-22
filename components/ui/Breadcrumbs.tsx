import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="text-muted-text transition-colors hover:text-gold">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-gold" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="text-muted-text transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-black" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
