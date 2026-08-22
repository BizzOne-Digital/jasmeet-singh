/**
 * Service areas — add cities only when confirmed by the client.
 * Do not invent market statistics or office locations.
 */

export interface ServiceArea {
  id: string;
  name: string;
  region: string;
  description: string;
  residential: boolean;
  commercial: boolean;
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "toronto",
    name: "Toronto",
    region: "Greater Toronto Area",
    description: "Canada's largest city — condominiums, detached homes, and commercial opportunities.",
    residential: true,
    commercial: true,
  },
  {
    id: "mississauga",
    name: "Mississauga",
    region: "Peel Region",
    description: "Diverse residential communities and growing commercial corridors.",
    residential: true,
    commercial: true,
  },
  {
    id: "brampton",
    name: "Brampton",
    region: "Peel Region",
    description: "Expanding suburban market with residential and industrial opportunities.",
    residential: true,
    commercial: true,
  },
  {
    id: "vaughan",
    name: "Vaughan",
    region: "York Region",
    description: "Established neighbourhoods and new development across residential and retail.",
    residential: true,
    commercial: true,
  },
  {
    id: "markham",
    name: "Markham",
    region: "York Region",
    description: "Technology corridor with strong residential and commercial demand.",
    residential: true,
    commercial: true,
  },
  {
    id: "richmond-hill",
    name: "Richmond Hill",
    region: "York Region",
    description: "Premium residential market with select commercial opportunities.",
    residential: true,
    commercial: true,
  },
  {
    id: "oakville",
    name: "Oakville",
    region: "Halton Region",
    description: "Waterfront-adjacent communities and upscale residential properties.",
    residential: true,
    commercial: true,
  },
  {
    id: "burlington",
    name: "Burlington",
    region: "Halton Region",
    description: "Lakefront living with accessible commercial districts.",
    residential: true,
    commercial: true,
  },
  {
    id: "hamilton",
    name: "Hamilton",
    region: "Hamilton-Niagara",
    description: "Revitalized urban core with residential and industrial potential.",
    residential: true,
    commercial: true,
  },
  {
    id: "kitchener-waterloo",
    name: "Kitchener-Waterloo",
    region: "Waterloo Region",
    description: "Innovation hub with growing residential and commercial sectors.",
    residential: true,
    commercial: true,
  },
  {
    id: "london",
    name: "London",
    region: "Southwestern Ontario",
    description: "University city with diverse housing and commercial inventory.",
    residential: true,
    commercial: true,
  },
  {
    id: "ottawa",
    name: "Ottawa",
    region: "Eastern Ontario",
    description: "National capital with stable residential and government-adjacent commercial markets.",
    residential: true,
    commercial: true,
  },
];

/** TODO: Confirm service areas with Jasmeet Singh and adjust list accordingly */
