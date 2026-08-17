export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "How often should I change my engine oil?",
    answer:
      "Most vehicles need an oil change every 5,000 to 8,000 kilometres, or every 6 months for time-based intervals. Synthetic oil may allow longer intervals. We recommend following your manufacturer's schedule and adjusting based on driving conditions — frequent short trips or heavy loads may require more frequent changes.",
  },
  {
    id: "2",
    question: "Why is my check engine light on?",
    answer:
      "The check engine light indicates your vehicle's computer has detected an issue. It can range from a loose gas cap to serious engine problems. We use diagnostic scanning to read error codes and determine the cause. Driving with the light on is sometimes safe, but flashing lights require immediate attention.",
  },
  {
    id: "3",
    question: "How long do brake pads typically last?",
    answer:
      "Brake pad life varies based on driving habits, vehicle type, and pad quality. Most pads last 40,000 to 80,000 kilometres. City driving with frequent stops wears pads faster. We inspect brake components during every service and recommend replacement when pads reach minimum thickness.",
  },
  {
    id: "4",
    question: "Do I need to rotate my tires?",
    answer:
      "Yes. Tire rotation every 8,000 to 10,000 kilometres promotes even wear and extends tire life. Front and rear tires wear differently due to weight distribution and steering forces. Rotation is quick and inexpensive compared to replacing tires prematurely.",
  },
  {
    id: "5",
    question: "What should I do if my car won't start?",
    answer:
      "First, check if the battery terminals are clean and tight. If you hear clicking but no start, the battery may be weak. If nothing happens at all, it could be battery, starter, or ignition switch issues. Call us — we can advise whether a tow is needed or if it's a simple fix.",
  },
  {
    id: "6",
    question: "How do I know if I need an alignment?",
    answer:
      "Signs include the vehicle pulling to one side, uneven tire wear, steering wheel off-centre when driving straight, or vibration at speed. Alignment issues often develop gradually after hitting curbs or potholes. We offer alignment checks and can correct angles to factory specifications.",
  },
  {
    id: "7",
    question: "Do you provide estimates before starting work?",
    answer:
      "Absolutely. We provide written estimates before any repair work begins. For diagnostics, we explain findings and costs before proceeding. We never perform unauthorized repairs — you approve the work and price upfront.",
  },
  {
    id: "8",
    question: "Can I wait while my vehicle is being serviced?",
    answer:
      "For quick services like oil changes and tire rotations, waiting is often possible. For longer repairs, we recommend arranging alternative transportation. Our team will give you an accurate time estimate when you drop off your vehicle.",
  },
];

export function getAllFAQItems(): FAQItem[] {
  return faqItems;
}
