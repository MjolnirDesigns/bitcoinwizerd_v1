// components/ui/Marquee.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  logos: { src: string; alt: string; width: number; height: number }[];
  direction?: "left" | "right";
  speed?: number; // Controls duration (lower is faster)
  gap?: number; // Space between logos in pixels
}

const Marquee: React.FC<MarqueeProps> = ({
  logos,
  direction = "left",
  speed = 20, // Faster scroll
  gap = 48, // Consistent with previous fix
}) => {
  const controls = useAnimation();
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Calculate total width of logos including gaps
  useEffect(() => {
    if (marqueeRef.current) {
      const totalWidth = logos.reduce((acc, logo) => acc + logo.width + gap, 0);

      // Set up animation
      controls.start({
        x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        },
      });
    }
  }, [logos, direction, speed, gap, controls]);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        ref={marqueeRef}
        className={cn("marquee-container flex items-center gap-12")}
        initial={{ x: 0 }} // Start at 0 to avoid initial jump
        animate={controls}
        style={{ willChange: "transform" }} // Optimize rendering
      >
        {/* Render logos three times for seamless loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className={cn("marquee-logo-wrapper flex-shrink-0")}
            style={{ minWidth: `${logo.width + gap}px` }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;