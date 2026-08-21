/**
 * Client-provided and workshop imagery for Namsot Auto Repair & Tire Works.
 * Client photos live in /public/images/client-*.png
 */

export type SiteImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/** Client-provided photography */
const client = {
  heroShopInterior: {
    src: "/images/client-hero-shop-interior.png",
    alt: "Namsot Auto Repair shop interior with Porsche on lift, alignment bay, and custom wheel studio",
  },
  exteriorOutdoor: {
    src: "/images/client-exterior-outdoor.png",
    alt: "Namsot Auto Repair outdoor service area with premium vehicles and shop signage at 632 Colby Dr, Waterloo",
  },
  workshopWide: {
    src: "/images/client-workshop-wide.png",
    alt: "Namsot workshop with Lucid, BMW, Land Rover, and Rivian vehicles on lifts",
  },
  mercedesService: {
    src: "/images/client-mercedes-service.png",
    alt: "Technician servicing a Mercedes G-Class on a lift at Namsot Auto Repair",
  },
  sikandarTechnician: {
    src: "/images/client-sikandar-technician.png",
    alt: "Sikandar, senior technician, performing engine service on a GMC truck",
  },
  storefrontPoster: {
    src: "/images/client-storefront-poster.jpg",
    alt: "Namsot Auto Repairs & Tire Works storefront poster at 632 Colby Dr Unit A, Waterloo",
    width: 1024,
    height: 576,
  },
  promoBannerCars: {
    src: "/images/client-promo-banner-cars.jpg",
    alt: "Namsot Auto Repairs & Tire Works — call 519-242-0900 for professional auto repair and tire service",
    width: 1024,
    height: 341,
  },
  posterFullServices: {
    src: "/images/client-poster-full-services.jpg",
    alt: "Namsot services poster — oil change, tires, brakes, A/C, suspension, and transmission at 632 Colby Dr, Waterloo",
    width: 682,
    height: 1024,
  },
  posterOrangeSplit: {
    src: "/images/client-poster-orange-split.jpg",
    alt: "Namsot Auto Repairs & Tire Works services and contact poster",
    width: 1024,
    height: 682,
  },
  posterTireBrake: {
    src: "/images/client-poster-tire-brake.jpg",
    alt: "Namsot brake repair and tire service poster",
    width: 682,
    height: 1024,
  },
} as const satisfies Record<string, SiteImage>;

export const images = {
  // Home & sections
  hero: client.heroShopInterior,
  aboutPreview: client.sikandarTechnician,
  storefrontPoster: client.storefrontPoster,
  promoBannerCars: client.promoBannerCars,
  posterFullServices: client.posterFullServices,
  posterOrangeSplit: client.posterOrangeSplit,
  posterTireBrake: client.posterTireBrake,

  // Page heroes
  aboutHero: client.workshopWide,
  aboutStory: client.mercedesService,
  servicesHero: client.heroShopInterior,
  bookingHero: client.mercedesService,
  contactHero: client.exteriorOutdoor,
  galleryHero: client.workshopWide,
  blogHero: client.workshopWide,
  teamHero: client.workshopWide,
  testimonialsHero: client.exteriorOutdoor,
  pricingHero: client.heroShopInterior,
  faqHero: client.workshopWide,
  shopHero: client.exteriorOutdoor,

  // Service cards
  serviceOilChange: client.sikandarTechnician,
  serviceTireChange: client.exteriorOutdoor,
  serviceBrake: client.mercedesService,
  serviceDiagnostics: client.heroShopInterior,
  serviceBattery: client.workshopWide,
  serviceAlignment: client.heroShopInterior,
  serviceSuspension: client.mercedesService,
  serviceAc: client.mercedesService,
  serviceGeneralRepair: client.workshopWide,
  servicePreventive: client.workshopWide,

  // Gallery
  galleryEngineBay: client.sikandarTechnician,
  galleryBrakes: client.mercedesService,
  galleryDiagnostics: client.heroShopInterior,
  galleryTireWheel: client.exteriorOutdoor,
  galleryUndercarriage: client.mercedesService,
  galleryShopFloor: client.workshopWide,
  galleryElectrical: client.workshopWide,
  galleryAlignment: client.heroShopInterior,
  galleryClimate: client.exteriorOutdoor,

  // Blog cards
  blogOil: client.sikandarTechnician,
  blogBrakes: client.mercedesService,
  blogWinter: client.workshopWide,
  blogTires: client.exteriorOutdoor,

  // Shop product cards
  productOil: {
    src: "/images/product-oil.jpg",
    alt: "Bottle of synthetic engine oil for automotive service",
  },
  productFilter: {
    src: "/images/product-oil-filter.jpg",
    alt: "Oil filter and motor oil for routine maintenance",
  },
  productBrakePads: client.mercedesService,
  productBattery: {
    src: "/images/car-battery.jpg",
    alt: "Automotive battery for replacement service",
  },

  // Team
  teamLead: client.heroShopInterior,
  teamSikandar: client.sikandarTechnician,
  teamSenior: client.mercedesService,
  teamDiagnostic: client.workshopWide,
  teamMaintenance: client.exteriorOutdoor,

  // Showcase
  showcaseSportsCar: client.mercedesService,

  productFallback: {
    src: "/images/engine-maintenance.jpg",
    alt: "Engine maintenance in a professional auto repair shop",
  },
} as const satisfies Record<string, SiteImage>;

/** All five client photos — use for homepage showcase grids. */
export const clientShowcase: SiteImage[] = [
  client.workshopWide,
  client.heroShopInterior,
  client.exteriorOutdoor,
  client.mercedesService,
  client.sikandarTechnician,
];

export function imageUrl(key: keyof typeof images): string {
  return images[key].src;
}
