// components/animations/TechStack.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TechStackProps {
  icons: { src: string; alt: string; width: number; height: number }[];
  speed?: number;
}

const TechStack: React.FC<TechStackProps> = ({ icons, speed = 20 }) => {
  const marqueeVariants = {
    animate: {
      y: [0, -50 * icons.length],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    },
  };

  const iconVariants = {
    initial: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: {
      rotateX: [0, 10, -10, 0],
      rotateY: [0, 15, -15, 0],
      scale: 1.1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="overflow-hidden w-full h-24 relative">
      <motion.div
        className="flex flex-col space-y-4"
        variants={marqueeVariants}
        animate="animate"
      >
        {/* Render icons twice for seamless vertical loop */}
        {[...icons, ...icons].map((icon, index) => (
          <motion.div
            key={`${icon.alt}-${index}`}
            className="mx-auto"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "center",
            }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
              className="object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;