// components/ui/AffiliateAd.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const buttonVariants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3, type: "spring", stiffness: 100 },
  },
  reveal: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const AffiliateAd: React.FC = () => {
  const affiliateLink = "https://www.solosatoshi.com/aff/164/";

  // MagicReveal button variant (simplified hover reveal effect)
  const MagicRevealButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block px-6 py-3 bg-bitcoin-orange text-white rounded-full font-ubuntu font-bold transition-all duration-300"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="reveal"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-wizerd-blue rounded-full"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );

  return (
    <motion.div
      className="max-w-7xl mx-auto my-12 p-4 sm:p-6 bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(255,153,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Container - Product Display */}
        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-bitcoin-orange mb-4 text-center">Bitaxe Gamma</h3>
          <Image
            src="https://www.solosatoshi.com/wp-content/uploads/2024/08/Bitaxe-Gamma-Front-View-300x300.png" // Placeholder image URL
            alt="Bitaxe Gamma Miner"
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
          />
          <p className="text-wizerd-blue text-center mt-4">
            Mine Bitcoin at home with 1.2 TH/s efficiency at just 18W! Open-source, Wi-Fi enabled, and Made in USA.
          </p>
          <MagicRevealButton href={affiliateLink}>
            Get Yours Now
          </MagicRevealButton>
          <p className="text-xs text-alien-green mt-2 text-center">
            *This post contains affiliate links, and I may earn a commission at no extra cost to you.
          </p>
        </div>

        {/* Right Container - Placeholder for More Items */}
        <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-alien-green mb-4 text-center">More Coming Soon</h3>
          <p className="text-wizerd-blue text-center mb-4">
            Exciting new Bitcoin mining gear and accessories are on the way! Stay tuned for updates.
          </p>
          <MagicRevealButton href={affiliateLink}>
            Check Back Later
          </MagicRevealButton>
          <div className="mt-4">
            <Image
              src="/assets/solosatoshi-qr.png" // Use your saved QR code image
              alt="SoloSatoshi Affiliate QR Code"
              width={128}
              height={128}
              className="mx-auto"
            />
            <p className="text-xs text-wizerd-blue mt-2 text-center">
              Scan to explore the Bitaxe Gamma!
            </p>
          </div>
          <p className="text-xs text-alien-green mt-2 text-center">
            *Affiliate link disclosure applies.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AffiliateAd;