import Link from "next/link";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-5 text-center text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-white/60">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="border border-white/30 px-6 py-3 text-sm uppercase tracking-wider transition-colors hover:border-gold hover:text-gold">
          Return home
        </Link>
        <WhatsAppCTA label="Chat on WhatsApp" variant="primary" />
      </div>
    </div>
  );
}
