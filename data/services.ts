import { images } from "./images";

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  features: string[];
  duration: string;
  priceFrom: number;
  imageUrl: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: "oil-change",
    name: "Oil Change",
    shortDescription:
      "Keep your engine protected with fresh oil and filter replacement using quality lubricants.",
    description:
      "Regular oil changes are essential for engine longevity. Our technicians drain old oil, replace the filter, and refill with premium oil suited to your vehicle's specifications. We inspect fluid levels and check for leaks during every service.",
    features: [
      "Premium engine oil suited to your vehicle",
      "New oil filter installation",
      "Fluid level inspection",
      "Multi-point visual check",
    ],
    duration: "30–45 min",
    priceFrom: 49,
    imageUrl: images.serviceOilChange.src,
    imageAlt: images.serviceOilChange.alt,
  },
  {
    slug: "tire-change",
    name: "Tire Change",
    shortDescription:
      "Seasonal tire swaps, rotations, and balancing to maximize tread life and handling.",
    description:
      "Whether you need seasonal tire changes, rotations, or balancing, we ensure your tires wear evenly and grip properly. Proper tire maintenance improves safety, fuel efficiency, and extends the life of your tires.",
    features: [
      "Seasonal tire installation",
      "Tire rotation and balancing",
      "Pressure check and adjustment",
      "Tread depth inspection",
    ],
    duration: "45–60 min",
    priceFrom: 35,
    imageUrl: images.serviceTireChange.src,
    imageAlt: images.serviceTireChange.alt,
  },
  {
    slug: "brake-service",
    name: "Brake Service",
    shortDescription:
      "Complete brake inspection, pad replacement, and rotor service for safe stopping power.",
    description:
      "Your brakes are your most critical safety system. We inspect pads, rotors, calipers, and fluid to ensure responsive, reliable braking. From pad replacement to full brake system service, we restore confidence in every stop.",
    features: [
      "Brake pad and rotor inspection",
      "Brake fluid level check",
      "Caliper and line assessment",
      "Road-test verification",
    ],
    duration: "1–2 hours",
    priceFrom: 149,
    imageUrl: images.serviceBrake.src,
    imageAlt: images.serviceBrake.alt,
  },
  {
    slug: "engine-diagnostics",
    name: "Engine Diagnostics",
    shortDescription:
      "Advanced computer diagnostics to pinpoint engine issues quickly and accurately.",
    description:
      "When warning lights appear or performance drops, our diagnostic equipment reads your vehicle's computer systems to identify root causes. We provide clear explanations and repair recommendations before any work begins.",
    features: [
      "OBD-II computer scanning",
      "Error code analysis",
      "Performance testing",
      "Detailed repair estimate",
    ],
    duration: "45–90 min",
    priceFrom: 89,
    imageUrl: images.serviceDiagnostics.src,
    imageAlt: images.serviceDiagnostics.alt,
  },
  {
    slug: "battery-service",
    name: "Battery Service",
    shortDescription:
      "Battery testing, replacement, and charging system checks to prevent no-start situations.",
    description:
      "A failing battery can leave you stranded. We test battery health, inspect terminals and cables, and check your charging system. If replacement is needed, we install quality batteries with proper warranty coverage.",
    features: [
      "Battery load testing",
      "Terminal cleaning and tightening",
      "Charging system check",
      "Quality battery replacement",
    ],
    duration: "30–45 min",
    priceFrom: 39,
    imageUrl: images.serviceBattery.src,
    imageAlt: images.serviceBattery.alt,
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment",
    shortDescription:
      "Precision alignment to correct steering pull, uneven wear, and improve handling.",
    description:
      "Misaligned wheels cause uneven tire wear and poor handling. Our alignment service adjusts camber, caster, and toe angles to manufacturer specifications, improving tire life and driving comfort.",
    features: [
      "Four-wheel alignment check",
      "Steering angle adjustment",
      "Tire wear pattern analysis",
      "Post-alignment report",
    ],
    duration: "45–60 min",
    priceFrom: 99,
    imageUrl: images.serviceAlignment.src,
    imageAlt: images.serviceAlignment.alt,
  },
  {
    slug: "suspension-repair",
    name: "Suspension Repair",
    shortDescription:
      "Shocks, struts, and suspension component repair for a smooth, controlled ride.",
    description:
      "Worn suspension components affect ride quality, handling, and safety. We inspect shocks, struts, bushings, and control arms, replacing worn parts to restore stability and comfort on every drive.",
    features: [
      "Shock and strut inspection",
      "Bushing and joint assessment",
      "Ride height evaluation",
      "Quality replacement parts",
    ],
    duration: "2–4 hours",
    priceFrom: 199,
    imageUrl: images.serviceSuspension.src,
    imageAlt: images.serviceSuspension.alt,
  },
  {
    slug: "air-conditioning-service",
    name: "Air Conditioning Service",
    shortDescription:
      "A/C recharge, leak detection, and climate system repair for year-round comfort.",
    description:
      "Stay comfortable in every season with properly maintained climate control. We inspect refrigerant levels, test for leaks, recharge systems, and repair components to keep your cabin at the right temperature.",
    features: [
      "Refrigerant level check",
      "Leak detection testing",
      "System recharge",
      "Blower and compressor inspection",
    ],
    duration: "1–2 hours",
    priceFrom: 129,
    imageUrl: images.serviceAc.src,
    imageAlt: images.serviceAc.alt,
  },
  {
    slug: "general-auto-repair",
    name: "General Auto Repair",
    shortDescription:
      "Comprehensive repair services for engines, transmissions, electrical, and more.",
    description:
      "From minor repairs to major component work, our shop handles a wide range of automotive issues. We combine experience with quality parts to get you back on the road safely and reliably.",
    features: [
      "Engine and transmission repairs",
      "Electrical system diagnostics",
      "Cooling system service",
      "Exhaust and emissions work",
    ],
    duration: "Varies",
    priceFrom: 79,
    imageUrl: images.serviceGeneralRepair.src,
    imageAlt: images.serviceGeneralRepair.alt,
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive Maintenance",
    shortDescription:
      "Scheduled maintenance packages to prevent breakdowns and extend vehicle life.",
    description:
      "Preventive maintenance catches small issues before they become expensive repairs. Our maintenance packages follow manufacturer schedules and include inspections tailored to your vehicle's age and mileage.",
    features: [
      "Manufacturer schedule alignment",
      "Fluid and filter services",
      "Belt and hose inspection",
      "Comprehensive vehicle health report",
    ],
    duration: "1–3 hours",
    priceFrom: 119,
    imageUrl: images.servicePreventive.src,
    imageAlt: images.servicePreventive.alt,
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getFeaturedServices(count = 6): Service[] {
  return services.slice(0, count);
}
