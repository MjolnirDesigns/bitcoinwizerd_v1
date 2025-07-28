// app/devkit/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { cn } from "@/lib/utils";
import SubscriberWizerd from "@/components/ui/SubscriberWizerd";
import WizerdPillCTA from "@/components/ui/WizerdPillCTA"; // Assuming this is defined

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// DevKitCard Component (adapted from ProductCard)
const DevKitCard: React.FC<{
  name: string;
  description: string;
  link: string;
}> = ({ name, description, link }) => {
  // Enhanced SVG icons with rotation animation
  const renderIcon = () => {
    const baseStyles = "w-16 h-16 text-white transition-transform duration-300";
    switch (name.toLowerCase()) {
      case "lightning wallet":
        return (
          <svg
            className={baseStyles}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        );
      case "animations":
        return (
          <svg
            className={baseStyles}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="8"
              strokeDasharray="25 25"
              initial={{ rotate: 0, pathLength: 0 }}
              whileHover={{ rotate: 360, pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        );
      case "charts":
        return (
          <svg
            className={baseStyles}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M5 20H19V4M5 14L9 10L12 13L16 8L19 11V20H5Z"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        );
      case "buttons":
        return (
          <svg
            className={baseStyles}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="4"
              initial={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        );
      case "dashboards":
        return (
          <svg
            className={baseStyles}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M3 3H21V9H3V3ZM3 11H21V17H3V11ZM3 19H21V21H3V19Z"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        );
      case "components":
        return (
          <svg
            className={baseStyles}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M12 4L9 8H15L12 12L15 16H9L12 20L9 16H7L4 20L7 16H5L2 12L5 8H7L4 4L7 8H9L12 4ZM14 12L17 8H19L22 12L19 16H17L14 12Z"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        );
      default:
        return null;
    }
  };

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
        {renderIcon()}
      </div>
      <p className="text-white mb-4 line-clamp-2">{description}</p>
      <WizerdPillCTA href={link} className="mt-4">
        Explore
      </WizerdPillCTA>
    </motion.div>
  );
};

export default function DevKit() {
  return (
    <div className={cn("min-h-screen bg-wizerd-darkestgrey")}>
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* DevKit Header and Text Block */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div
            className={cn(
              "bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-lg p-6 mb-6 devkit-header-container"
            )}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-ubuntu text-center">
              <span className="text-bitcoin-orange">₿itcoin</span>
              <span className="text-alien-green">Wizerd</span>{" "}
              <span className="text-wizerd-blue">DevKit</span>
            </h1>
          </div>
          <div className="text-wizerd-blue font-ubuntu text-base sm:text-lg leading-relaxed">
            <p className="mb-4">
              The BitcoinWizerd DevKit provides cutting-edge tools and components for developers. Enhance your Bitcoin projects with our premium resources.
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

        {/* DevKit Row 1 */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl font-bold text-bitcoin-orange mb-6">DevKit Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DevKitCard
              name="Lightning Wallet"
              description="Code snippets for a Bitcoin Lightning wallet"
              link="/devkit/lightning-wallet"
            />
            <DevKitCard
              name="Animations"
              description="Cyberpunk-themed UI animations"
              link="/devkit/animations"
            />
            <DevKitCard
              name="Charts"
              description="Interactive price and volume charts"
              link="/devkit/charts"
            />
          </div>
        </motion.div>

        {/* DevKit Row 2 */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DevKitCard
              name="Buttons"
              description="Styled buttons in BitcoinWizerd colors"
              link="/devkit/buttons"
            />
            <DevKitCard
              name="Dashboards"
              description="Customizable crypto dashboard components"
              link="/devkit/dashboards"
            />
            <DevKitCard
              name="Components"
              description="3D and other animated Bitcoin web3 tools"
              link="/devkit/components"
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