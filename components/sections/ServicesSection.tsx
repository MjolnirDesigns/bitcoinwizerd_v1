// app/components/sections/ServicesSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import SubscriberWizerd from "@/components/ui/SubscriberWizerd";
// import Marquee from '@/components/ui/Marquee';

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-wizerd-darkestgrey py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Animated High-Tech Header Container */}
        <motion.div
          className="relative bg-mystic-blue text-white rounded-lg p-2 sm:p-4 mb-8 shadow-lg overflow-hidden custom-projects-shadow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Bezel Effect with Pseudo-elements */}
          <div className="absolute inset-0 border-2 border-mystic-blue/50 rounded-lg transform translate-z-0"></div>
          <div className="absolute inset-1 border border-white/10 rounded-lg transform translate-z-1"></div>
          {/* Header */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-ubuntu text-center z-10 relative">
            Services
          </h1>
        </motion.div>

        {/* Placeholder Content */}
        <div className="text-center text-gray-400 mb-8">
          <p>Coming soon: Subscriber email collection or services content.</p>
          <SubscriberWizerd
            title="₿itcoinWizerd Newsletter"
            description="Stay updated with the latest Bitcoin and crypto insights. Subscribe now!"
            buttonText="Join Now"
          />
        </div>

        {/* Subscriber Component */}
      </div>
    </section>
  );
};

export default ServicesSection;

/* Add this CSS to your global stylesheet or a relevant CSS module:
.custom-projects-shadow {
  box-shadow: 0 4px 15px rgba(51, 204, 255, 0.3), 0 2px 5px rgba(0, 0, 0, 0.5);
}
*/