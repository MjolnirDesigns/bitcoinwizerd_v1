// app/services/page.tsx
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

// ServiceCard Component (adapted from ProductCard)
const ServiceCard: React.FC<{
  name: string;
  imageSrc: string;
  description: string;
  link: string;
  isPlaceholder?: boolean;
  position?: number; // To determine animation direction
}> = ({ name, imageSrc, description, link, isPlaceholder = false, position = 1 }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center"
      initial={{ x: position % 2 === 1 ? "-100%" : "100%", opacity: 0 }} // Slide from left or right based on position
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
      <p className="text-white mb-4">{description}</p>
      <WizerdPillCTA href={link} className="mt-4">
        Learn More
      </WizerdPillCTA>
    </motion.div>
  );
};

export default function Services() {
  return (
    <div className={cn("min-h-screen bg-wizerd-darkestgrey")}>
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* Services Header and Text Block */}
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
              <span className="text-wizerd-blue">Services</span>
            </h1>
          </div>
          <div className="text-wizerd-blue font-ubuntu text-base sm:text-lg leading-relaxed">
            <p className="mb-4 text-center">
              BitcoinWizerd offers expert business consulting solutions for Bitcoin and blockchain projects.
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

        {/* Business Consulting Row */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl font-bold text-bitcoin-orange mb-6">Business Consulting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              name="Bitcoin Strategy"
              imageSrc="/images/bitcoin-strategy.jpg" // Replace with actual image
              description="Tailored consulting to integrate Bitcoin into your business strategy."
              link="/services/business-consulting/bitcoin-strategy" // Placeholder sub-page
              position={1} // Top-left, slide from left
            />
            <ServiceCard
              name="Blockchain Advisory"
              imageSrc="/images/blockchain-advisory.jpg" // Replace with actual image
              description="Expert advice on blockchain implementation and optimization."
              link="/services/business-consulting/blockchain-advisory" // Placeholder sub-page
              position={2} // Top-right, slide from right
            />
          </div>
        </motion.div>

        {/* Web Development Row */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl font-bold text-bitcoin-orange mb-6">Web Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              name="Custom Animations"
              imageSrc="" // Replace with actual image
              description="Bold 3D animation design for applications and websites."
              link="/services/web-development/custom-animations" // Placeholder sub-page
              position={1} // Lower-right, slide from right
            />
            <ServiceCard
              name="Web and Web3 Design"
              imageSrc="" // Replace with actual image
              description="Web solutions tailored for any business project."
              link="/services/web-development/web-web3" // Placeholder sub-page
              position={2} // Lower-left, slide from left
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