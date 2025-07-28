// app/payments/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tiers = [
  {
    name: "Pleb",
    price: "Free",
    features: [
      "Access to basic components",
      "Community support",
      "Limited API calls",
    ],
    cta: "Get Started",
    ctaLink: "/get-started",
    highlight: false,
  },
  {
    name: "Standard",
    price: "$19.99/mo",
    features: [
      "All Pleb features",
      "Standard component library",
      "Priority email support",
      "100 API calls/day",
    ],
    cta: "Subscribe",
    ctaLink: "/subscribe", // Placeholder for Stripe
    highlight: false,
  },
  {
    name: "Premium",
    price: "$99.99/mo",
    features: [
      "All Standard features",
      "Premium component library",
      "24/7 chat support",
      "500 API calls/day",
      "Early access to updates",
    ],
    cta: "Subscribe",
    ctaLink: "/subscribe", // Placeholder for Stripe
    highlight: true, // Fire icon and glow
  },
  {
    name: "Maxi",
    price: "$499/mo",
    features: [
      "All Premium features",
      "Custom integrations",
      "Dedicated account manager",
      "Unlimited API calls",
      "Enterprise support (Contact Us)",
    ],
    cta: "Contact Us",
    ctaLink: "/contact",
    highlight: false,
  },
];

export default function Payments() {
  return (
    <div className={cn("min-h-screen bg-wizerd-darkestgrey")}>
      <Navbar />
      <main className="pt-20 pb-12 px-4 sm:px-6 md:px-8">
        <motion.div
          className="max-w-7xl mx-auto mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-ubuntu text-bitcoin-orange mb-4">
            Choose Your <span className="text-alien-green">₿itcoinWizerd</span> Plan
          </h1>
          <p className="text-wizerd-blue font-ubuntu text-lg">
            Unlock the power of Bitcoin with our tailored subscription tiers.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              className={cn(
                "bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-lg p-6 border",
                tier.highlight ? "border-punk-pink shadow-[0_0_15px_rgba(255,51,204,0.5)]" : "border-gray-700",
                "hover:shadow-[0_0_20px_rgba(255,153,0,0.3)] transition-all duration-300"
              )}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold font-ubuntu text-cyber-yellow mb-2">
                  {tier.name}
                </h2>
                {tier.highlight && (
                  <div className="flex justify-center mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Flame className="w-6 h-6 text-bitcoin-orange" />
                    </motion.div>
                    <span className="text-sm text-alien-green ml-2">Best Value</span>
                  </div>
                )}
                <h1 className="text-3xl font-bold text-wizerd-blue mb-4">{tier.price}</h1>
                <ul className="text-wizerd-blue font-ubuntu text-sm mb-6 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="text-bitcoin-orange mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.ctaLink}
                  className={cn(
                    "block w-full py-2 rounded-lg font-ubuntu font-bold text-sm transition",
                    tier.cta === "Get Started"
                      ? "bg-bitcoin-orange text-white hover:bg-cyber-yellow hover:text-black"
                      : tier.cta === "Subscribe"
                      ? "bg-alien-green text-black hover:bg-cyber-yellow"
                      : "bg-wizerd-blue text-white hover:bg-punk-pink"
                  )}
                >
                  {tier.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}