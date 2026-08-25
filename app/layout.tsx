import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { BodyRouteClass } from "@/components/layout/BodyRouteClass";
import { IntroGate } from "@/components/layout/IntroGate";
import { AffordabilityPopupProvider } from "@/components/sections/AffordabilityPopup";
import { defaultMetadata } from "@/lib/metadata";
import { getStructuredData } from "@/lib/structured-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = getStructuredData();

  return (
    <html lang="en-CA" className={`${cormorant.variable} ${manrope.variable} overflow-x-hidden`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="w-full overflow-x-hidden bg-warm-white">
        <IntroGate>
          <AffordabilityPopupProvider>
            <BodyRouteClass />
            <AnnouncementBar />
            <Header />
            <main className="w-full max-w-[100vw] overflow-x-hidden">
              {children}
            </main>
            <Footer />
            <MobileActionBar />
          </AffordabilityPopupProvider>
        </IntroGate>
      </body>
    </html>
  );
}
