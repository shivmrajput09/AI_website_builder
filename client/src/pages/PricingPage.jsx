import React from "react";
import { BadgeCheck } from "lucide-react";
import Header from "../components/Header"; // Header import kiya taaki navbar same rahe

// [Zero-Knowledge Explanation]
// Data array: Yahan humne saare plans define kiye hain. 
// "isPopular" flag jis plan par true hoga, wo plan baakiyon se thoda highlight ho jayega (Lime color ke sath).
const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for testing and small personal projects.",
    features: ["1 Project limit", "Basic templates", "Community support"],
    buttonText: "Start for free",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Everything you need to build professional websites.",
    features: ["Unlimited projects", "Premium templates", "Priority support", "Custom domains"],
    buttonText: "Upgrade to Pro",
    isPopular: true, // Yeh highlight hoga
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "Advanced features for teams and large agencies.",
    features: ["Custom AI models", "Dedicated account manager", "White-labeling", "API access"],
    buttonText: "Contact Sales",
    isPopular: false,
  },
];

// Custom component jo green checkmark (BadgeCheck) ke sath list item render karega
function FeatureItem({ children }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-paper">
      <BadgeCheck className="mt-0.5 shrink-0 text-lime" size={22} />
      <span>{children}</span>
    </li>
  );
}

export default function PricingPage() {
  return (
    // [Change Effect]
    // mx-auto aur max-w-[1280px] se page exactly Home page jaisa center aur align rahega.
    <main className="mx-auto max-w-[1280px] p-3 sm:p-6">
      {/* Outer rounded container (bg-paper) taaki theme break na ho */}
      <div className="rounded-[2.5rem] bg-paper pb-4 sm:pb-12">
        <Header />

        {/* ---------- PRICING HERO SECTION ---------- */}
        <section className="mx-3 mt-10 rounded-[2rem] bg-forest-800 p-7 sm:mx-6 sm:p-12 text-center">
          <h1 className="text-5xl font-bold text-paper sm:text-6xl mb-4">
            Simple, transparent pricing.
            <span className="block text-lime mt-2">Pay as you grow.</span>
          </h1>
          <p className="text-lg text-mist max-w-2xl mx-auto">
            No hidden fees. No surprise charges. Choose the plan that fits your needs and start building your dream website today.
          </p>
        </section>

        {/* ---------- PRICING CARDS ---------- */}
        {/* Grid setup for 3 columns on large screens */}
        <section className="mx-3 mt-6 grid gap-6 sm:mx-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              // [Change Effect]
              // Agar plan popular hai toh 'bg-forest-800' aur border-lime denge.
              // Agar normal hai toh 'bg-forest-950' denge. Isse depth create hoti hai.
              className={`relative flex flex-col rounded-[2rem] p-8 sm:p-10 ${
                plan.isPopular 
                  ? "bg-forest-800 border-2 border-lime shadow-lg" 
                  : "bg-forest-950 border border-paper/10"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-lime text-forest-800 px-5 py-1.5 rounded-full text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-paper mb-2">{plan.name}</h2>
                <p className="text-sm text-mist h-10">{plan.description}</p>
              </div>

              {/* Price Display */}
              <div className="mb-8 flex items-baseline border-b border-paper/10 pb-8">
                <span className="text-5xl font-display font-bold text-paper">{plan.price}</span>
                {plan.period && <span className="text-lg text-mist ml-1">{plan.period}</span>}
              </div>

              {/* Features List */}
              <ul className="mb-8 flex-grow space-y-4">
                {plan.features.map((feature, idx) => (
                  <FeatureItem key={idx}>{feature}</FeatureItem>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-full font-display font-semibold text-base transition duration-200 ${
                  plan.isPopular
                    ? "bg-lime text-forest-800 hover:brightness-95" // Highlighted button
                    : "bg-paper/10 text-paper hover:bg-paper/20"    // Normal button
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}