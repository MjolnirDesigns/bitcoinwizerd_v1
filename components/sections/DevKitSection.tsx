// app/components/sections/DevKitSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion"; // Note: Corrected typo in import (assuming you meant "framer-motion")

const DevKitSection: React.FC = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animation variants for Bento Box items
  const bentoItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="bg-wizerd-darkestgrey py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Animated High-Tech Header Container */}
        <motion.div
          className="relative bg-alien-green text-black rounded-lg p-2 sm:p-4 mb-8 shadow-lg overflow-hidden custom-projects-shadow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Bezel Effect with Pseudo-elements */}
          <div className="absolute inset-0 border-2 border-alien-green/50 rounded-lg transform translate-z-0"></div>
          <div className="absolute inset-1 border border-white/10 rounded-lg transform translate-z-1"></div>
          {/* Header */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-ubuntu text-center z-10 relative">
            DevKit
          </h1>
        </motion.div>

        {/* Bento Box Component Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Example Bento Box Item: Bitcoin Lightning Wallet */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-48 border-2 border-alien-green hover:shadow-[0_0_10px_rgba(51,224,0,0.5)] transition-shadow duration-300"
            variants={bentoItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-alien-green mb-2">Lightning Wallet</h3>
            <p className="text-gray-400 text-center">Code snippets for a Bitcoin Lightning wallet</p>
          </motion.div>

          {/* Example Bento Box Item: Dashboard */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-48 border-2 border-cyber-yellow hover:shadow-[0_0_10px_rgba(255,255,0,0.5)] transition-shadow duration-300"
            variants={bentoItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-cyber-yellow mb-2">Animations</h3>
            <p className="text-gray-400 text-center">Cyberpunk-themed UI animations</p>
          </motion.div>

          {/* Example Bento Box Item: Charts */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-48 border-2 border-bitcoin-orange hover:shadow-[0_0_10px_rgba(255,153,0,0.5)] transition-shadow duration-300"
            variants={bentoItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-bitcoin-orange mb-2">Charts</h3>
            <p className="text-gray-400 text-center">Interactive price and volume charts</p>
          </motion.div>

          {/* Example Bento Box Item: Buttons */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-48 border-2 border-alien-green hover:shadow-[0_0_10px_rgba(51,224,0,0.5)] transition-shadow duration-300"
            variants={bentoItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-alien-green mb-2">Buttons</h3>
            <p className="text-gray-400 text-center">Styled buttons in BitcoinWizerd colors</p>
          </motion.div>

          {/* Example Bento Box Item: Animations */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-48 border-2 border-cyber-yellow hover:shadow-[0_0_10px_rgba(255,255,0,0.5)] transition-shadow duration-300"
            variants={bentoItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-cyber-yellow mb-2">Dashboards</h3>
            <p className="text-gray-400 text-center">Customizable crypto dashboard components</p>
          </motion.div>

          {/* Example Bento Box Item: Components */}
          <motion.div
            className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center h-48 border-2 border-bitcoin-orange hover:shadow-[0_0_10px_rgba(255,153,0,0.5)] transition-shadow duration-300"
            variants={bentoItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-bitcoin-orange mb-2">Components</h3>
            <p className="text-gray-400 text-center">3D and other animated Bitcoin web3 tools</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DevKitSection;

/* Add this CSS to your global stylesheet or a relevant CSS module:
.custom-projects-shadow {
  box-shadow: 0 4px 15px rgba(51, 204, 255, 0.3), 0 2px 5px rgba(0, 0, 0, 0.5);
}
*/