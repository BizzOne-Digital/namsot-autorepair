export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "oil-change",
    name: "Oil Change",
    description: "Essential engine protection with quality oil and filter.",
    price: 49,
    priceNote: "Starting at",
    features: [
      "Up to 5L conventional oil",
      "New oil filter",
      "Fluid level check",
      "Visual inspection",
    ],
  },
  {
    id: "tire-service",
    name: "Tire Service",
    description: "Rotation, balancing, or seasonal change for up to four tires.",
    price: 35,
    priceNote: "Starting at",
    features: [
      "Tire rotation or change",
      "Pressure adjustment",
      "Tread depth check",
      "Wheel torque to spec",
    ],
  },
  {
    id: "brake-inspection",
    name: "Brake Inspection",
    description: "Complete brake system assessment for safe stopping.",
    price: 49,
    features: [
      "Pad and rotor inspection",
      "Brake fluid check",
      "Caliper assessment",
      "Written report",
    ],
  },
  {
    id: "diagnostic",
    name: "Diagnostic Service",
    description: "Computer scan and analysis for check engine and warning lights.",
    price: 89,
    features: [
      "OBD-II code reading",
      "System analysis",
      "Repair recommendation",
      "Estimate provided",
    ],
  },
  {
    id: "maintenance-basic",
    name: "Basic Maintenance Package",
    description: "Scheduled maintenance for vehicles under 100,000 km.",
    price: 149,
    priceNote: "Starting at",
    highlighted: true,
    features: [
      "Oil and filter change",
      "Multi-point inspection",
      "Fluid top-off",
      "Belt and hose check",
      "Tire pressure check",
    ],
  },
  {
    id: "maintenance-premium",
    name: "Premium Maintenance Package",
    description: "Comprehensive service for high-mileage or older vehicles.",
    price: 249,
    priceNote: "Starting at",
    features: [
      "Everything in Basic Package",
      "Brake inspection",
      "Battery test",
      "Alignment check",
      "Detailed health report",
      "Priority scheduling",
    ],
  },
];

export function getAllPricingPlans(): PricingPlan[] {
  return pricingPlans;
}
