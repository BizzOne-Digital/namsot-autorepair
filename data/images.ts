/**
 * Workshop-focused imagery — vehicles on lifts, technicians at work, and quality
 * cars in a professional auto repair setting. Files live in /public/images/.
 */

export type SiteImage = {
  src: string;
  alt: string;
};

export const images = {
  // Home & sections
  hero: {
    src: "/images/hero-auto-shop.jpg",
    alt: "Technicians servicing vehicles on lifts inside an auto repair workshop",
  },
  aboutPreview: {
    src: "/images/mechanic-oil-service.jpg",
    alt: "Mechanic pouring engine oil during a service in the repair bay",
  },

  // Page heroes
  aboutHero: {
    src: "/images/shop-service-bays.jpg",
    alt: "Multiple service bays with vehicles on lifts in the repair shop",
  },
  aboutStory: {
    src: "/images/car-on-lift-workshop.jpg",
    alt: "Vehicle raised on a lift in a professional auto repair workshop",
  },
  servicesHero: {
    src: "/images/service-luxury-workshop.jpg",
    alt: "Luxury vehicles being serviced on lifts in our auto repair workshop",
  },
  bookingHero: {
    src: "/images/car-on-lift.jpg",
    alt: "Car on a lift ready for scheduled maintenance and repair",
  },
  contactHero: {
    src: "/images/auto-shop-front.jpg",
    alt: "Automotive repair and tire shop storefront",
  },
  galleryHero: {
    src: "/images/workshop-floor.jpg",
    alt: "Wide view of the auto repair workshop floor with service equipment",
  },
  blogHero: {
    src: "/images/mechanic-workshop.jpg",
    alt: "Mechanic working on a vehicle inside the repair workshop",
  },
  teamHero: {
    src: "/images/busy-repair-shop.jpg",
    alt: "Busy auto repair shop with technicians working on customer vehicles",
  },
  testimonialsHero: {
    src: "/images/vehicles-in-shop.jpg",
    alt: "Customer vehicles lined up for service in the repair centre",
  },
  pricingHero: {
    src: "/images/tools-wall.jpg",
    alt: "Automotive tools organised on the workshop wall",
  },
  faqHero: {
    src: "/images/repair-shop-interior.jpg",
    alt: "Interior of a fully equipped auto repair workshop",
  },
  shopHero: {
    src: "/images/parts-shelves.jpg",
    alt: "Motor oil and automotive parts stocked in the shop",
  },

  // Service cards — workshop work on premium and everyday vehicles
  serviceOilChange: {
    src: "/images/service-vehicle-on-lift.jpg",
    alt: "Premium vehicle on a shop lift receiving a professional oil change",
  },
  serviceTireChange: {
    src: "/images/tire-on-lift.jpg",
    alt: "Tire change and wheel service on a vehicle raised in the workshop",
  },
  serviceBrake: {
    src: "/images/brake-service.jpg",
    alt: "Brake disc and caliper repair in the service bay",
  },
  serviceDiagnostics: {
    src: "/images/diagnostic-scan.jpg",
    alt: "Advanced diagnostics on a modern vehicle in the repair shop",
  },
  serviceBattery: {
    src: "/images/car-battery.jpg",
    alt: "Battery and electrical system service in the engine bay",
  },
  serviceAlignment: {
    src: "/images/alloy-wheel.jpg",
    alt: "Wheel alignment service on a premium alloy wheel and tire",
  },
  serviceSuspension: {
    src: "/images/undercarriage-inspection.jpg",
    alt: "Suspension and undercarriage repair on a lifted vehicle",
  },
  serviceAc: {
    src: "/images/ac-dashboard.jpg",
    alt: "Air conditioning service on a modern vehicle climate system",
  },
  serviceGeneralRepair: {
    src: "/images/service-porsche.jpg",
    alt: "Porsche, BMW, Mercedes and all makes repaired in our workshop",
  },
  servicePreventive: {
    src: "/images/service-premium-suv.jpg",
    alt: "SUV and family vehicles receiving preventive maintenance in our shop",
  },

  // Gallery
  galleryEngineBay: {
    src: "/images/engine-bay.jpg",
    alt: "Clean engine bay after a full maintenance service",
  },
  galleryBrakes: {
    src: "/images/brake-caliper.jpg",
    alt: "Brake caliper and rotor during brake system repair",
  },
  galleryDiagnostics: {
    src: "/images/engine-diagnostics.jpg",
    alt: "Technician diagnosing electrical systems in the workshop",
  },
  galleryTireWheel: {
    src: "/images/tire-on-lift.jpg",
    alt: "Wheel and tire service on a vehicle raised on a shop lift",
  },
  galleryUndercarriage: {
    src: "/images/mechanic-under-car.jpg",
    alt: "Mechanic inspecting the underside of a vehicle on a lift",
  },
  galleryShopFloor: {
    src: "/images/luxury-car-workshop.jpg",
    alt: "Premium vehicle being serviced in the repair workshop",
  },
  galleryElectrical: {
    src: "/images/engine-diagnostics.jpg",
    alt: "Electrical and engine diagnostics in the service bay",
  },
  galleryAlignment: {
    src: "/images/alignment-equipment.jpg",
    alt: "Wheel alignment equipment in the tire and alignment bay",
  },
  galleryClimate: {
    src: "/images/garage-repair.jpg",
    alt: "Vehicle climate and cabin systems serviced in the garage",
  },

  // Blog cards
  blogOil: {
    src: "/images/oil-service-engine.jpg",
    alt: "Engine bay during a professional oil change service",
  },
  blogBrakes: {
    src: "/images/brake-caliper.jpg",
    alt: "Brake components during a brake service appointment",
  },
  blogWinter: {
    src: "/images/winter-driving.jpg",
    alt: "Vehicle prepared for winter driving conditions",
  },
  blogTires: {
    src: "/images/tire-closeup.jpg",
    alt: "Tire and wheel inspected during tire maintenance",
  },

  // Shop product cards
  productOil: {
    src: "/images/product-oil.jpg",
    alt: "Bottle of synthetic engine oil for automotive service",
  },
  productFilter: {
    src: "/images/product-oil-filter.jpg",
    alt: "Oil filter and motor oil for routine maintenance",
  },
  productBrakePads: {
    src: "/images/brake-service.jpg",
    alt: "Brake rotor assembly for brake pad replacement",
  },
  productBattery: {
    src: "/images/car-battery.jpg",
    alt: "Automotive battery for replacement service",
  },

  // Team — technicians at work in the workshop
  teamLead: {
    src: "/images/mechanic-at-work.jpg",
    alt: "Lead technician repairing a vehicle in the workshop",
  },
  teamSenior: {
    src: "/images/mechanic-under-car.jpg",
    alt: "Senior technician servicing a vehicle on a lift",
  },
  teamDiagnostic: {
    src: "/images/technician-diagnostics.jpg",
    alt: "Diagnostic specialist working on a vehicle in the shop",
  },
  teamMaintenance: {
    src: "/images/mechanic-portrait.jpg",
    alt: "Maintenance technician in the auto repair workshop",
  },

  // Showcase cars in workshop context
  showcaseSportsCar: {
    src: "/images/sports-car-workshop.jpg",
    alt: "Sports car ready for service in the repair shop",
  },

  productFallback: {
    src: "/images/engine-maintenance.jpg",
    alt: "Engine maintenance in a professional auto repair shop",
  },
} as const satisfies Record<string, SiteImage>;

export function imageUrl(key: keyof typeof images): string {
  return images[key].src;
}
