// app/store/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { cn } from "@/lib/utils";
import SubscriberWizerd from "@/components/ui/SubscriberWizerd";
import WizerdPillCTA from "@/components/ui/WizerdPillCTA"; // Assuming this is defined

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ProductCard Component
const ProductCard: React.FC<{
  name: string;
  imageSrc: string;
  description: string;
  link: string;
  isPlaceholder?: boolean;
}> = ({ name, imageSrc, description, link, isPlaceholder = false }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center"
      initial={{ x: "-100%", opacity: 0 }} // All cards slide from left
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h3 className="text-2xl font-bold text-cyber-yellow mb-4">{name}</h3>
      <div className="w-48 h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
        {/* Placeholder or actual image */}
        {isPlaceholder ? (
          <span className="text-gray-400">Image Placeholder</span>
        ) : (
          <Image
            src={imageSrc}
            alt={`${name} Image`}
            width={192}
            height={192}
            className="rounded-lg object-cover"
          />
        )}
      </div>
      <p className="text-white mb-4 line-clamp-2">{description}</p>
      <WizerdPillCTA href={link} className="mt-4">
        Buy Now
      </WizerdPillCTA>
    </motion.div>
  );
};

export default function Store() {
  const affiliateLink = "https://www.solosatoshi.com/aff/164/";

  return (
    <div className={cn("min-h-screen bg-wizerd-darkestgrey")}>
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* Store Header and Text Block */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div
            className={cn(
              "bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-lg p-6 mb-6 header-container"
            )}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-ubuntu text-center">
              <span className="text-bitcoin-orange">₿itcoin</span>
              <span className="text-alien-green">Wizerd</span>{" "}
              <span className="text-wizerd-blue">Store</span>
            </h1>
          </div>
          <div className="text-wizerd-blue font-ubuntu text-base sm:text-lg leading-relaxed">
            <p className="mb-4">
              The BitcoinWizerd Store offers premium components, tools, and merch for Bitcoin enthusiasts and developers. Shop now to power your crypto journey.
            </p>
            <p className="text-xs text-alien-green text-center">
              *This page contains affiliate links, and I may earn a commission at no extra cost to you.
            </p>
          </div>
        </motion.div>

        {/* Wide Image - Removed Image tag */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          {/* Image tag removed as requested */}
        </motion.div>

        {/* Bitcoin Miners Row */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl font-bold text-bitcoin-orange mb-6">Bitcoin Miners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              name="Bitaxe Gamma"
              imageSrc="https://www.solosatoshi.com/wp-content/uploads/2024/08/Bitaxe-Gamma-Front-View-300x300.png"
              description="Mine Bitcoin at home with 1.2 TH/s efficiency at just 18W! This compact device is perfect for beginners, offering low power consumption and easy setup for home mining setups."
              link={affiliateLink}
            />
            <ProductCard
              name="NerdQAxe+"
              imageSrc="/images/nerdqaxe+.jpg" // Replace with actual image
              description="Advanced miner with 2.5 TH/s and low power consumption. Ideal for mid-tier miners looking to scale operations with efficient energy use and robust performance."
              link={affiliateLink}
            />
            <ProductCard
              name="NerdQAxe++"
              imageSrc="/images/nerdqaxe++.jpg" // Replace with actual image
              description="Top-tier miner with 5 TH/s for serious Bitcoin mining. Designed for professionals, it features advanced cooling and high durability for continuous operation."
              link={affiliateLink}
            />
          </div>
        </motion.div>

        {/* Bitcoin Wallets Row */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl font-bold text-bitcoin-orange mb-6">Bitcoin Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              name="D'cent"
              imageSrc="/images/d'cent.jpg" // Replace with actual image
              description="Secure hardware wallet for Bitcoin storage. Offers robust security features and a user-friendly interface for managing your digital assets safely."
              link={affiliateLink}
            />
            <ProductCard
              name="Ledger"
              imageSrc="/images/ledger.jpg" // Replace with actual image
              description="Industry-leading wallet with multi-currency support. Known for its top-notch security and compatibility with various blockchain networks."
              link={affiliateLink}
            />
            <ProductCard
              name="Tangem"
              imageSrc="/images/tangem.jpg" // Replace with actual image
              description="Compact NFC wallet for easy Bitcoin management. Features a sleek design and quick access, perfect for on-the-go crypto users."
              link={affiliateLink}
            />
          </div>
        </motion.div>

        {/* Developer Tools Row */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl font-bold text-bitcoin-orange mb-6">Developer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              name="Coming Soon"
              imageSrc=""
              description="Exciting new developer tools are on the way! Stay tuned for innovative solutions to enhance your Bitcoin development projects."
              link={affiliateLink}
              isPlaceholder={true}
            />
            <ProductCard
              name="Coming Soon"
              imageSrc=""
              description="Exciting new developer tools are on the way! Stay tuned for innovative solutions to enhance your Bitcoin development projects."
              link={affiliateLink}
              isPlaceholder={true}
            />
            <ProductCard
              name="Coming Soon"
              imageSrc=""
              description="Exciting new developer tools are on the way! Stay tuned for innovative solutions to enhance your Bitcoin development projects."
              link={affiliateLink}
              isPlaceholder={true}
            />
          </div>
        </motion.div>

        {/* Subscribe Component */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <SubscriberWizerd
            title="₿itcoinWizerd Newsletter"
            description="Stay updated with the latest Bitcoin and crypto insights. Subscribe now!"
            buttonText="Join Now"
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}