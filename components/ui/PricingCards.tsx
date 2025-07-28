// app/components/ui/PricingCards.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: string;
  altPrice?: string;
  features: string[];
  borderColor: string;
  headingColor: string;
  shadowColor: string;
  isHotDeal?: boolean;
  ctaText?: string;
}

interface PricingCardsProps {
  tiers?: PricingTier[];
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Pleb",
    price: "$0 - FREE!",
    features: [
      "Basic components",
      "Community support",
      "Bitcoin tutorials",
      "Newsletter updates",
    ],
    borderColor: "wizerd-blue",
    headingColor: "wizerd-blue",
    shadowColor: "rgba(30,144,255,0.5)",
    ctaText: "Get Started",
  },
  {
    name: "Standard",
    price: "$99/mo",
    features: [
      "All components & libraries",
      "API access",
      "Priority support",
      "Exclusive tutorials",
    ],
    borderColor: "alien-green",
    headingColor: "alien-green",
    shadowColor: "rgba(0,255,0,0.5)",
    isHotDeal: true,
    ctaText: "Buy Now",
  },
  {
    name: "Premium",
    price: "$499/mo",
    features: [
      "Custom AI agents",
      "Advanced analytics",
      "White-glove support",
      "Early feature access",
    ],
    borderColor: "cyber-yellow",
    headingColor: "cyber-yellow",
    shadowColor: "rgba(255,255,0,0.5)",
    ctaText: "Buy Now",
  },
  {
    name: "Maxi",
    price: "$2499/mo or",
    altPrice: "0.025 BTC",
    features: [
      "Trading bot access",
      "Custom development",
      "Dedicated manager",
      "VIP community",
    ],
    borderColor: "bitcoin-orange",
    headingColor: "bitcoin-orange",
    shadowColor: "rgba(247,147,26,0.5)",
    ctaText: "Contact Us",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const priceVariants = {
  enter: { opacity: 0, rotateX: -90, y: 20 },
  center: { opacity: 1, rotateX: 0, y: 0 },
  exit: { opacity: 0, rotateX: 90, y: -20 },
};

const PricingCards: React.FC<PricingCardsProps> = ({
  tiers = defaultTiers,
  className,
}) => {
  const [maxiPriceIndex, setMaxiPriceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMaxiPriceIndex((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getBorderColor = (borderColor: string) => {
    switch (borderColor) {
      case "wizerd-blue":
        return "#33ccff";
      case "alien-green":
        return "#33e000";
      case "cyber-yellow":
        return "#ffff00";
      case "bitcoin-orange":
        return "#ff9900";
      default:
        return borderColor;
    }
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-6 perspective-1000", className)}>
      {tiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          className={cn(
            "relative bg-gray-800 rounded-lg p-6 text-center border-wizerd-blue",
            `border-${tier.borderColor}`,
            "transform-gpu preserve-3d"
          )}
          style={{ border: `3px solid ${getBorderColor(tier.borderColor)}` }}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          whileHover={{
            scale: 1.05,
            rotateX: 5,
            rotateY: 5,
            z: 20,
            transition: { type: "spring", damping: 20, duration: 0.4 },
          }}
        >
          {/* Layer 1: Outer shadow */}
          <div
            className="absolute inset-0 rounded-lg shadow-lg"
            style={{ boxShadow: `0 8px 16px ${tier.shadowColor}` }}
          />
          {/* Layer 2: Inner card */}
          <div className="relative z-10 bg-gray-800 rounded-lg p-4">
            {/* Layer 3: Heading container */}
            <div
              className="border-t-4 pt-2 mb-4"
              style={{ borderTopColor: getBorderColor(tier.borderColor) }}
            >
              <h3 className={cn("text-xl font-bold font-ubuntu", `text-${tier.headingColor}`)}>
                {tier.name}
                {tier.isHotDeal && (
                  <FaFire
                    className="inline-block ml-2 w-6 h-6 text-bitcoin-orange animate-flicker"
                    style={{ filter: `drop-shadow(0 0 5px rgba(247,147,26,0.5))` }}
                  />
                )}
              </h3>
            </div>
            <div className="min-h-[3rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tier.name === "Maxi" ? maxiPriceIndex : tier.price}
                  className="text-2xl font-bold text-white mb-4"
                  variants={priceVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {tier.name === "Maxi" ? (maxiPriceIndex === 0 ? tier.price : tier.altPrice) : tier.price}
                </motion.p>
              </AnimatePresence>
            </div>
            <ul className="text-gray-400 mb-6 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="mb-2 whitespace-nowrap truncate">
                  {feature}
                </li>
              ))}
            </ul>
            <motion.button
              className="bg-bitcoin-orange text-white px-4 py-2 rounded-lg hover:bg-cyber-yellow hover:text-black transition font-ubuntu"
              whileHover={{ scale: 1.05, transition: { type: "spring", damping: 20 } }}
              whileTap={{ scale: 0.95 }}
            >
              {tier.ctaText}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCards;