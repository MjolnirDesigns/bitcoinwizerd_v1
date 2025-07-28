"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection: React.FC = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-wizerd-darkestgrey py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Animated High-Tech Header Container */}
        <motion.div
          className="relative bg-[#33ccff] rounded-lg p-2 sm:p-4 mb-8 shadow-lg overflow-hidden custom-projects-shadow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Bezel Effect with Pseudo-elements */}
          <div className="absolute inset-0 border-2 border-[#33ccff]/50 rounded-lg transform translate-z-0"></div>
          <div className="absolute inset-1 border border-white/10 rounded-lg transform translate-z-1"></div>
          {/* Header */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-ubuntu text-white text-center z-10 relative">
            Projects
          </h2>
        </motion.div>

        {/* Placeholder Content */}
        <div className="text-center text-gray-400 text-sm sm:text-base">
          <p>Placeholder: Future home for projects built by MjolnirDesignStudios.com.</p>
          <p className="mt-2">Content to be added later for project showcases.</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

/* Add this CSS to your global stylesheet or a relevant CSS module:
.custom-projects-shadow {
  box-shadow: 0 4px 15px rgba(51, 204, 255, 0.3), 0 2px 5px rgba(0, 0, 0, 0.5);
}
*/