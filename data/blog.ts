import { images } from "./images";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  author: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "when-should-you-change-your-oil",
    title: "When Should You Change Your Oil?",
    excerpt:
      "Understanding oil change intervals helps protect your engine and avoid unnecessary service. Learn what factors affect how often you should change your oil.",
    publishedAt: "2026-03-01",
    author: "Sanjeev Kumar",
    category: "Maintenance",
    readTime: "5 min read",
    imageUrl: images.blogOil.src,
    imageAlt: images.blogOil.alt,
    content: [
      "Engine oil is the lifeblood of your vehicle. It lubricates moving parts, reduces friction, and helps dissipate heat. Over time, oil breaks down and becomes contaminated with dirt, metal particles, and combustion byproducts. Running on old oil accelerates wear and can lead to costly engine damage.",
      "The traditional rule of changing oil every 3,000 kilometres has largely been replaced by manufacturer recommendations, which often range from 5,000 to 12,000 kilometres depending on the vehicle and oil type. Modern synthetic oils last longer and perform better under extreme temperatures than conventional oils.",
      "Your driving habits matter. Frequent short trips, stop-and-go city driving, towing, and extreme temperatures put more stress on oil. If most of your driving involves these conditions, shorter intervals are wise even if your manual suggests longer ones.",
      "Time is another factor. Even if you drive infrequently, oil degrades over months. Most manufacturers recommend at least one oil change per year for low-mileage vehicles. Check both mileage and calendar intervals and follow whichever comes first.",
      "Watch for warning signs: dark, gritty oil on the dipstick, increased engine noise, or the oil change reminder on your dashboard. At Namsot Auto repairs & tire works, we use quality oils matched to your vehicle and inspect related components during every oil service.",
    ],
  },
  {
    slug: "signs-your-brakes-need-attention",
    title: "Signs Your Brakes Need Attention",
    excerpt:
      "Brake problems rarely appear without warning. Recognize these signs early to stay safe and avoid more expensive repairs down the road.",
    publishedAt: "2026-02-15",
    author: "Sikandar",
    category: "Safety",
    readTime: "4 min read",
    imageUrl: images.blogBrakes.src,
    imageAlt: images.blogBrakes.alt,
    content: [
      "Your braking system is your most important safety feature. Ignoring early warning signs can turn a simple pad replacement into a rotor, caliper, or hydraulic system repair costing significantly more.",
      "Squealing or squeaking when braking often indicates worn brake pads. Many pads have built-in wear indicators that create noise when pads reach minimum thickness. Grinding sounds suggest pads are completely worn and metal is contacting the rotor — stop driving and schedule service immediately.",
      "A soft or spongy brake pedal can indicate air in the brake lines or worn brake fluid. If the pedal sinks toward the floor, you may have a fluid leak or master cylinder issue. Either situation requires immediate professional inspection.",
      "Vibration or pulsing when braking typically points to warped rotors or uneven pad deposits. The vehicle may also pull to one side if a caliper is sticking or pads wear unevenly. These issues affect stopping distance and handling.",
      "Don't wait for symptoms to worsen. We recommend brake inspections at every oil change and whenever you notice unusual sounds, smells, or pedal behaviour. Preventive brake maintenance keeps you safe and saves money.",
    ],
  },
  {
    slug: "how-to-prepare-your-vehicle-for-winter",
    title: "How to Prepare Your Vehicle for Winter",
    excerpt:
      "Cold weather stresses batteries, tires, and fluids. A pre-winter check ensures your vehicle handles ice, snow, and freezing temperatures reliably.",
    publishedAt: "2026-01-20",
    author: "James O'Brien",
    category: "Seasonal",
    readTime: "6 min read",
    imageUrl: images.blogWinter.src,
    imageAlt: images.blogWinter.alt,
    content: [
      "Winter driving demands more from your vehicle. Batteries lose capacity in cold weather, tire grip decreases on ice and snow, and fluids thicken when temperatures drop. Preparing before the first freeze prevents breakdowns and accidents.",
      "Start with your battery. Cold weather reduces battery output just when your engine needs more power to start. We test battery health, clean terminals, and verify the charging system. Replacing a weak battery before winter is far cheaper than a tow on a freezing morning.",
      "Tires are critical. All-season tires work in mild winter conditions, but dedicated winter tires provide significantly better traction on snow and ice. Check tread depth — worn tires hydroplane on wet roads and slide on snow. Maintain proper tire pressure, which drops in cold weather.",
      "Fluids need attention too. Engine coolant should protect against freezing in your climate. Brake fluid absorbs moisture over time, which can cause corrosion and reduced performance. Washer fluid should be rated for sub-zero temperatures so your windshield stays clear.",
      "Pack an emergency kit: flashlight, jumper cables, ice scraper, blanket, and phone charger. Schedule a pre-winter inspection at Namsot Auto repairs & tire works — we'll check everything from wipers to heating systems so you're ready for the season ahead.",
    ],
  },
  {
    slug: "why-tire-maintenance-matters",
    title: "Why Tire Maintenance Matters",
    excerpt:
      "Tires affect safety, fuel economy, and handling more than most drivers realize. Proper maintenance extends tire life and keeps you safe on the road.",
    publishedAt: "2026-01-05",
    author: "Elena Rodriguez",
    category: "Maintenance",
    readTime: "5 min read",
    imageUrl: images.blogTires.src,
    imageAlt: images.blogTires.alt,
    content: [
      "Tires are the only part of your vehicle that touches the road. Their condition directly affects braking distance, cornering stability, fuel efficiency, and ride comfort. Neglected tires wear faster, cost more in fuel, and increase accident risk.",
      "Tire pressure is the simplest maintenance task with the biggest impact. Underinflated tires flex excessively, generate heat, wear unevenly on the edges, and increase rolling resistance. Overinflated tires wear the centre tread and reduce grip. Check pressure monthly and before long trips.",
      "Rotation spreads wear evenly across all four tires. Front tires typically wear faster due to steering and braking forces. Rotating every 8,000 to 10,000 kilometres can extend tire life by thousands of kilometres and maintain balanced handling.",
      "Alignment keeps your vehicle tracking straight and prevents uneven wear patterns like feathering or cupping. If your steering wheel isn't centred or the car pulls to one side, alignment may be off. Misalignment often follows hitting potholes or curbs.",
      "Replace tires when tread depth reaches 4/32 inches on wet roads or 2/32 inches legally. Look for cracks, bulges, or punctures in the sidewall. At Namsot Auto repairs & tire works, we inspect tires during every service and help you maximize safety and value.",
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedBlogPosts(count = 3): BlogPost[] {
  return blogPosts.slice(0, count);
}
