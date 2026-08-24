export interface PropertyFinderSelections {
  goal: string;
  sector: string;
  area: string;
  propertyType: string;
  budget: string;
  timeline: string;
}

export interface PropertyFinderPayload {
  name: string;
  phone: string;
  email?: string;
  selections: PropertyFinderSelections;
}

export function buildPropertyFinderWhatsAppMessage(
  name: string,
  selections: PropertyFinderSelections
): string {
  const selectionLines = [
    selections.goal && `Goal: ${selections.goal}`,
    selections.sector && `Sector: ${selections.sector}`,
    selections.area && `Area: ${selections.area}`,
    selections.propertyType && `Property type: ${selections.propertyType}`,
    selections.budget && `Budget: ${selections.budget}`,
    selections.timeline && `Timeline: ${selections.timeline}`,
  ].filter(Boolean);

  return [
    `Hi ${name}, I'm Jasmeet from Jasmeet Singh Real Estate. Thanks for sharing your preferences through my Property Finder on the website.`,
    "",
    selectionLines.length > 0 ? "Based on your selections:" : "",
    ...selectionLines,
    "",
    "I'd love to help you further. Could you share a few more details?",
    "",
    "What type of property are you looking for?",
    "Preferred location?",
    "Budget?",
    "Number of bedrooms?",
    "Are you a first-time buyer?",
    "Do you need mortgage/financing assistance?",
    "When are you planning to buy?",
  ]
    .filter((line) => line !== "")
    .join("\n");
}
