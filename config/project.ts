export const projectName = "Wadeem Gardens";
export const developerName = "Modon";
export const projectTagline = "A New Standard of Luxury Living in Abu Dhabi";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wadeemgardens.com";

export const projectData = {
  name: projectName,
  developer: developerName,
  location: "Hudayriyat Island, Abu Dhabi",
  startingPrice: "AED 8,700,000",
  startingPriceValue: 8700000,
  bedrooms: "4 - 6",
  paymentPlan: "25 / 75",
  handover: "Q4 2030",
  status: "EOI Open",
  totalUnits: 250,
  completionPercentage: 0,
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Payment Plan", href: "#payment" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
];

export const MIRAGE_WEBSITE = "https://mcpuae.com";

const IMAGE_CDN = "https://images.mcpuae.com";
export const IMAGE_PATH = `${IMAGE_CDN}/images/wadeemgardens`;

export const projectStoryItems = [
  {
    label: "The Residences",
    heading: "Crafted for Distinction",
    description:
      "Every residence is a testament to refined living, where expansive floor plans meet meticulous attention to detail. Floor-to-ceiling windows frame breathtaking views, while premium finishes and thoughtful design create spaces that inspire.",
    imageLabel: "Interior Residences",
  },
  {
    label: "Architecture",
    heading: "Where Vision Meets Skyline",
    description:
      "A striking architectural statement that harmonizes with Abu Dhabi's iconic skyline. The design draws inspiration from the desert landscape and the Arabian Gulf, creating a landmark that is both timeless and contemporary.",
    imageLabel: "Architectural Design",
  },
  {
    label: "Landscape",
    heading: "Nature as Architecture",
    description:
      "Meticulously curated landscapes weave through the development, creating a seamless connection between indoor luxury and outdoor serenity. Lush gardens, reflective water features, and shaded walkways define the living experience.",
    imageLabel: "Landscaped Gardens",
  },
  {
    label: "Privacy",
    heading: "Your Sanctuary Above",
    description:
      "Designed with discretion and privacy at its core, each residence offers a secluded retreat from the world. Dedicated private entrances, sound-insulated walls, and expansive private terraces ensure an intimate living experience.",
    imageLabel: "Private Terrace",
  },
  {
    label: "Community",
    heading: "A World Within a World",
    description:
      "Beyond the private residences lies a vibrant community designed to foster connection. Shared spaces, social clubs, and curated events create a neighborhood where lasting relationships are built.",
    imageLabel: "Community Spaces",
  },
  {
    label: "Waterfront",
    heading: "Living by the Water",
    description:
      "Set along the pristine waterfront, the development offers an unparalleled connection to the sea. Private marina access, waterfront promenades, and stunning Arabian Gulf views redefine coastal luxury.",
    imageLabel: "Waterfront Living",
  },
];

export const propertyTypes = [
  {
    name: "4 Bedroom Villa",
    bedrooms: 4,
    style: "Arabian / Modern",
    price: "AED 8,700,000",
    priceValue: 8700000,
    imageLabel: "4 Bedroom Villa",
    plotArea: "532 m²",
    gsa: "430 m²",
    features: ["Arabian / Modern design", "Premium finishes", "Private driveway"],
    images: {
      arabian: `${IMAGE_PATH}/ex/2.jpg`,
      modern: `${IMAGE_PATH}/ex/3.jpg`,
    },
  },
  {
    name: "5 Bedroom Villa",
    bedrooms: 5,
    style: "Arabian / Modern",
    price: "AED 10,200,000",
    priceValue: 10200000,
    imageLabel: "5 Bedroom Villa",
    plotArea: "630 m²",
    gsa: "510 m²",
    features: ["Arabian / Modern design", "Premium finishes", "Private driveway"],
    images: {
      arabian: `${IMAGE_PATH}/ex/4.jpg`,
      modern: `${IMAGE_PATH}/ex/5.jpg`,
    },
  },
  {
    name: "6 Bedroom Villa",
    bedrooms: 6,
    style: "Arabian / Modern",
    price: "AED 11,600,000",
    priceValue: 11600000,
    imageLabel: "6 Bedroom Villa",
    plotArea: "720 m²",
    gsa: "591 m²",
    features: ["Arabian / Modern design", "Premium finishes", "Private driveway"],
    images: {
      arabian: `${IMAGE_PATH}/ex/6.jpg`,
      modern: `${IMAGE_PATH}/ex/7.jpg`,
    },
  },
];

export const amenitiesList = [
  { number: "01", name: "2.3 KM Airconditioned Spine" },
  { number: "02", name: "Arena" },
  { number: "03", name: "6 Clubhouses" },
  { number: "04", name: "Office Park" },
  { number: "05", name: "Healthcare Centres" },
  { number: "06", name: "Waterfront Promenade" },
  { number: "07", name: "Retail & Dining" },
  { number: "08", name: "2 International Schools" },
  { number: "09", name: "Cinemas" },
];

export const paymentPlan = {
  name: "First of its Kind Financial Solution",
  partner: "ADIB",
  label: "25 / 75",
  buyerPercent: 25,
  financedPercent: 75,
  schedule: [
    {
      stage: "Down Payment",
      payer: "Buyer",
      percent: 5,
      detail: "On booking",
    },
    {
      stage: "Construction Instalments",
      payer: "Buyer",
      percent: 15,
      detail: "Months 8 / 14 / 20",
    },
    {
      stage: "Pre-Handover Finance",
      payer: "ADIB",
      percent: 20,
      detail: "Before handover",
    },
    {
      stage: "Handover Payment",
      payer: "Buyer",
      percent: 5,
      detail: "Month 48",
    },
    {
      stage: "Post-Handover Finance",
      payer: "ADIB",
      percent: 55,
      detail: "From month 54",
    },
  ],
};

export const eoiTimeline = {
  label: "Expression of Interest",
  starts: "18 Sep 2026",
  ends: "28 Sep 2026",
  vipSales: "29 Sep 2026",
  salesLaunch: "1 Oct 2026",
  value: "AED 50,000",
  note: "Priority sales for ADIB pre-approved buyers with previous EOI value 50K",
};

type LocationIcon =
  | "city"
  | "plane"
  | "entertainment"
  | "museum"
  | "business"
  | "shopping"
  | "health"
  | "education";

export const locationDistances: Array<{
  place: string;
  distance: string;
  icon: LocationIcon;
}> = [
  { place: "Downtown Abu Dhabi", distance: "10-15 min", icon: "city" },

  { place: "Zayed International Airport", distance: "25-30 min", icon: "plane" },
  
  { place: "Yas Island", distance: "25-30 min", icon: "entertainment" },
  
  { place: "Saadiyat Island Cultural District", distance: "15-20 min", icon: "museum" },
  
  { place: "Al Maryah Island (Financial Centre)", distance: "15-20 min", icon: "business" },
  
  { place: "Abu Dhabi Mall", distance: "15-20 min", icon: "shopping" },
  
  { place: "Cleveland Clinic Abu Dhabi", distance: "10-15 min", icon: "health" },
  
  { place: "British School Al Khubairat", distance: "10-15 min", icon: "education" },
];

export const whyAbuDhabiReasons = [
  {
    title: "Strategic Global Location",
    description:
      "Positioned at the crossroads of Europe, Asia and Africa, Abu Dhabi offers unparalleled global connectivity with direct flights to major world cities.",
  },
  {
    title: "World-Class Infrastructure",
    description:
      "From the award-winning airport to expanding metro networks and iconic cultural institutions, Abu Dhabi's infrastructure rivals any global capital.",
  },
  {
    title: "Unmatched Lifestyle",
    description:
      "Ferrari World, the Louvre Abu Dhabi, pristine beaches, desert adventures and year-round sunshine create an extraordinary quality of life.",
  },
  {
    title: "Growing Real Estate Demand",
    description:
      "Abu Dhabi's population growth and economic diversification continue to drive strong demand for premium residential properties.",
  },
  {
    title: "Waterfront Living Redefined",
    description:
      "Miles of pristine coastline, private beaches and marina access set Abu Dhabi apart as a premier waterfront living destination.",
  },
  {
    title: "Long-Term Value",
    description:
      "A stable economy, investor-friendly policies and limited premium supply make Abu Dhabi real estate a compelling long-term investment.",
  },
];

export const galleryItems = [
  { image: `${IMAGE_PATH}/ex/1.png` },
  { image: `${IMAGE_PATH}/ex/8.jpg` },
  { image: `${IMAGE_PATH}/ex/9.jpg` },
  { image: `${IMAGE_PATH}/ex/10.jpg` },
  { image: `${IMAGE_PATH}/ex/11.png` },
  { image: `${IMAGE_PATH}/ex/12.webp` },
  { image: `${IMAGE_PATH}/ex/2.jpg`, label: "4 Bedroom Villa — Arabian" },
  { image: `${IMAGE_PATH}/ex/3.jpg`, label: "4 Bedroom Villa — Modern" },
  { image: `${IMAGE_PATH}/ex/4.jpg`, label: "5 Bedroom Villa — Arabian" },
  { image: `${IMAGE_PATH}/ex/5.jpg`, label: "5 Bedroom Villa — Modern" },
  { image: `${IMAGE_PATH}/ex/6.jpg`, label: "6 Bedroom Villa — Arabian" },
  { image: `${IMAGE_PATH}/ex/7.jpg`, label: "6 Bedroom Villa — Modern" },
  { image: `${IMAGE_PATH}/ex/13.jpg` },
  { image: `${IMAGE_PATH}/ex/14.jpg` },
  { image: `${IMAGE_PATH}/ex/15.jpg` },
  { image: `${IMAGE_PATH}/ex/16.jpg` },
  { image: `${IMAGE_PATH}/ex/17.jpg` },
  { image: `${IMAGE_PATH}/ex/18.jpg` },
  { image: `${IMAGE_PATH}/ex/19.jpg` },
  { image: `${IMAGE_PATH}/ex/20.jpg` },
  { image: `${IMAGE_PATH}/int/1.jpg` },
  { image: `${IMAGE_PATH}/int/2.jpg` },
  { image: `${IMAGE_PATH}/int/3.jpg` },
  { image: `${IMAGE_PATH}/int/4.jpg` },
];

export const floorPlans = [
  { beds: 4, image: `${IMAGE_PATH}/floorplan/4br.jpg` },
  { beds: 5, image: `${IMAGE_PATH}/floorplan/5br.jpg` },
  { beds: 6, image: `${IMAGE_PATH}/floorplan/6br.jpg` },
];

export const HERO_IMAGE_URL = `${IMAGE_PATH}/ex/10.jpg`;

export const MASTERPLAN_URL = `${IMAGE_PATH}/masterplan/wadeemgardens_plan.svg`;

export const BRAND_LOGO_URL = `${IMAGE_PATH}/logo/logo.webp`;

export const MIRAGE_LOGO_URL = `${IMAGE_PATH}/logo/mirage1.png`;

export const FAVICON_URL = `${IMAGE_PATH}/logo/favicon.png`;

export const BROCHURE_URL = process.env.NEXT_PUBLIC_BROCHURE_URL || "";
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+971507019484";
export const LEAD_API_URL = process.env.NEXT_PUBLIC_LEAD_API_URL || "";
