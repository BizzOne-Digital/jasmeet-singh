# Jasmeet Singh Real Estate

Premium, cinematic real estate website for **Jasmeet Singh** — serving clients Ontario-wide with residential and commercial buy, sell, lease, and investment services.

**Tagline:** Turning Dreams Into Addresses

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Lucide React**

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production site URL (for SEO/sitemap) |
| `NEXT_PUBLIC_WHATSAPP_URL` | WhatsApp CTA link |
| `NEXT_PUBLIC_PHONE` | Phone number with country code |
| `NEXT_PUBLIC_EMAIL` | Contact email |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
app/                  # Next.js App Router pages (each route is separate)
components/
  layout/             # Header, Footer, AnnouncementBar, MobileActionBar
  motion/             # AnimatedReveal, GoldLine, CinematicIntro
  pages/              # Page-specific content components
  properties/         # PropertyCard, FavouriteButton
  sections/           # Home page and shared sections
  ui/                 # Reusable UI (PageHero, WhatsAppCTA, etc.)
content/
  business.ts         # ★ Central business config — update everything here
  navigation.ts       # Nav and footer links
  pages.ts            # Page content and image URLs
  about.ts            # About page biography (TODO placeholders)
  faq.ts              # FAQ content
  testimonials.ts     # Testimonial placeholders
data/
  properties.ts       # Property listings (empty until verified data supplied)
  areas.ts            # Ontario service areas
lib/
  metadata.ts         # SEO metadata helpers
  whatsapp.ts         # WhatsApp URL builder
  structured-data.ts  # JSON-LD schema
public/
  brand/              # Logo (jasmeet-singh-logo.png)
  images/             # Local images and placeholders
```

## Updating Business Information

All contact details, social links, brokerage wording, CTA labels, and legal disclosures are managed in **`content/business.ts`**.

Update phone, email, WhatsApp, Instagram, brokerage display, tagline, and availability from this single file.

## Replacing the Logo

Place the logo at `public/brand/jasmeet-singh-logo.png`. Do not distort, recolour, or crop. The logo is designed for dark backgrounds.

## Replacing Images

Development uses Unsplash URLs configured in `content/pages.ts`. Replace URLs with client photography:

1. Add images to `public/images/`
2. Update URLs in `content/pages.ts`
3. For remote images, add hostname to `next.config.ts` `remotePatterns`

## Adding Verified Properties

Edit `data/properties.ts`:

```typescript
export const properties: Property[] = [
  {
    slug: "123-main-st-toronto",
    title: "Luxury Condo — Downtown Toronto",
    status: "for-sale",
    sector: "residential",
    category: "condo",
    area: "Toronto",
    address: "123 Main St",
    price: 899000,
    description: "...",
    features: ["2 bed", "2 bath", "Parking"],
    images: ["https://..."],
    isPublished: true,
  },
];
```

**Do not publish fabricated listings.** Set `isPublished: false` for drafts.

## Editing Areas, FAQs, and Testimonials

| Content | File |
|---|---|
| Service areas | `data/areas.ts` |
| FAQ | `content/faq.ts` |
| Testimonials | `content/testimonials.ts` |
| About biography | `content/about.ts` |

## WhatsApp CTAs

All conversion CTAs open WhatsApp via `lib/whatsapp.ts`. The `WhatsAppCTA` component is used site-wide. Optional prefilled messages are supported for standard `wa.me/number` links; the supplied `/message/` link opens directly.

## Brokerage & Legal Disclosures

Placeholder text is in `content/business.ts` (`brokerage.disclosure`, `legal.privacyPolicy`, `legal.termsDisclaimer`). Replace with client-approved wording before launch.

## MLS / IDX Integration (Future)

This site does **not** claim MLS®, REALTOR®, CREA, TRREB, or PropTx integration.

To integrate an authorised feed later:

1. Obtain required permissions and licensing
2. Create `lib/listings-feed.ts` adapter
3. Map feed data to the `Property` type in `data/properties.ts`
4. Add cron/webhook to sync listings
5. Update README and remove "available by request" empty states

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables from `.env.example`
4. Deploy

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Jasmeet |
| `/properties` | Property discovery |
| `/properties/[slug]` | Property detail |
| `/residential` | Residential services |
| `/commercial` | Commercial services |
| `/buyers` | Buyer journey |
| `/sellers` | Seller journey |
| `/leasing` | Leasing services |
| `/investments` | Investment guidance |
| `/areas` | Ontario areas served |
| `/testimonials` | Client experiences |
| `/faq` | FAQ |
| `/contact` | Direct contact (no form) |
| `/privacy` | Privacy policy placeholder |
| `/terms` | Terms placeholder |

## Design System

Colours (CSS variables in `app/globals.css`):

- Black `#050505`, Charcoal `#151515`, White, Ivory `#F6F3EC`
- Gold `#C8A45A`, Bright Gold `#E3C06F`, Deep Gold `#8E6B2E`

Fonts: Cormorant Garamond (display), Manrope (body)

**No blue** anywhere in the interface.

## Accessibility

- WCAG AA contrast targets
- Keyboard navigation and visible focus states
- `prefers-reduced-motion` support
- Semantic HTML with one H1 per page
- No contact forms or newsletter pop-ups

## License

Private — © Jasmeet Singh. All rights reserved.
