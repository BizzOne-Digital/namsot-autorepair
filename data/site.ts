export const businessInfo = {
  name: "Namsot Auto repairs & tire works",
  phone: "(519) 242-0900",
  phoneHref: "tel:+15192420900",
  email: "sanjeev112233@icloud.com",
  emailHref: "mailto:sanjeev112233@icloud.com",
  address: "632 Colby Dr Unit A, Waterloo, ON",
  addressLine: "Serving Waterloo and surrounding communities",
  mapPlaceholder: "Map integration coming soon",
} as const;

export const brandDisplay = {
  primary: "NAMSOT",
  secondary: "Auto repairs & tire works",
} as const;

export const brandAssets = {
  logo: "/logo.png",
  logoWidth: 511,
  logoHeight: 489,
} as const;

export const openingHours = [
  { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { days: "Saturday", hours: "9:00 AM – 4:00 PM" },
  { days: "Sunday", hours: "Closed" },
] as const;

export const heroContent = {
  headline: "Expert Auto Repair. Trusted Service.",
  subheadline:
    "Professional automotive repair and maintenance services designed to keep your vehicle safe, reliable, and road-ready.",
  primaryCta: { label: "Book a Service", href: "/booking" },
  secondaryCta: { label: "Shop Products", href: "/shop" },
} as const;

export const trustIndicators = [
  { label: "15+ Years Experience", description: "Trusted local expertise" },
  { label: "Certified Technicians", description: "Skilled & qualified staff" },
  { label: "Quality Parts", description: "OEM & premium aftermarket" },
  { label: "Transparent Pricing", description: "No hidden fees" },
] as const;

export const whyChooseUs = [
  {
    title: "Expert Diagnostics",
    description:
      "Advanced tools and experienced technicians identify issues accurately, saving you time and unnecessary repairs.",
  },
  {
    title: "Quality Workmanship",
    description:
      "Every service is performed with precision and care, using quality parts that meet or exceed manufacturer standards.",
  },
  {
    title: "Customer-First Service",
    description:
      "We explain your options clearly, respect your budget, and never recommend work your vehicle doesn't need.",
  },
  {
    title: "Safety Focused",
    description:
      "Your safety on the road is our priority. We inspect critical systems and ensure your vehicle meets safe operating standards.",
  },
] as const;

export const promoContent = {
  title: "Spring Maintenance Special",
  description:
    "Book a comprehensive vehicle inspection and oil change package. Keep your engine running smoothly as seasons change.",
  cta: { label: "Book Your Service", href: "/booking" },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = {
  services: [
    { href: "/services/oil-change", label: "Oil Change" },
    { href: "/services/brake-service", label: "Brake Service" },
    { href: "/services/engine-diagnostics", label: "Diagnostics" },
    { href: "/services", label: "All Services" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Our Team" },
    { href: "/pricing", label: "Pricing" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
} as const;
