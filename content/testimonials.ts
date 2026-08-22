export type TestimonialCategory = "buyer" | "seller" | "lease" | "investment";

export interface Testimonial {
  id: string;
  category: TestimonialCategory;
  quote: string;
  name: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "buyer-1",
    category: "buyer",
    quote:
      "Jasmeet made our first home purchase feel manageable from start to finish. He was responsive, explained every step clearly, and helped us find a condo in Mississauga that truly fit our budget and timeline.",
    name: "Priya & Rahul M.",
    context: "First-time buyers, Mississauga",
  },
  {
    id: "seller-1",
    category: "seller",
    quote:
      "We needed a thoughtful strategy, not just a listing. Jasmeet guided us through preparation, pricing conversations, and negotiations with calm professionalism. The entire process felt structured and well managed.",
    name: "David K.",
    context: "Home seller, Vaughan",
  },
  {
    id: "buyer-2",
    category: "buyer",
    quote:
      "As a move-up buyer, I valued Jasmeet's market perspective and direct communication. He helped us evaluate properties objectively and move forward with confidence when the right opportunity came up.",
    name: "Amanda T.",
    context: "Move-up buyer, Toronto",
  },
  {
    id: "lease-1",
    category: "lease",
    quote:
      "Finding the right commercial space for our growing team was stressful until we started working with Jasmeet. He understood our requirements, short-listed suitable options, and kept the lease process moving smoothly.",
    name: "Michael L.",
    context: "Commercial tenant, Brampton",
  },
  {
    id: "investment-1",
    category: "investment",
    quote:
      "Jasmeet helped us think through location, cash flow, and long-term fit rather than rushing into a deal. His approach was practical, transparent, and focused on our investment goals across the GTA.",
    name: "Sarah & James W.",
    context: "Residential investors, Oakville",
  },
  {
    id: "seller-2",
    category: "seller",
    quote:
      "From staging advice to offer review, Jasmeet stayed involved throughout. We always knew where things stood, and that level of communication made a real difference during a competitive market.",
    name: "Harpreet S.",
    context: "Condo seller, Markham",
  },
];

export const testimonialCategories: { id: TestimonialCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "buyer", label: "Buyer" },
  { id: "seller", label: "Seller" },
  { id: "lease", label: "Lease" },
  { id: "investment", label: "Investment" },
];
