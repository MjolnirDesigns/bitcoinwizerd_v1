import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";

// Interface for animation states
interface AnimationState {
  [key: number]: {
    direction: string;
    spin: number; // 1 for clockwise, -1 for counterclockwise
    speed: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
}

interface GlowState {
  [key: number]: string;
}

// BitcoinWizerd-themed colors
const THEMED_COLORS = {
  "Punk-Pink": "#ff33cc",
  "Bitcoin-Orange": "#ff9900",
  "Cyber-Yellow": "#ffff00",
  "Alien-Green": "#33e000",
  "Wizerd-Blue": "#33ccff",
};

// Icon data with Icons8-compatible names
const iconList = [
  { id: "nextjs", name: "next-js", alt: "Next.js" },
  { id: "nodejs", name: "nodejs", alt: "Node.js" },
  { id: "tailwindcss", name: "tailwindcss", alt: "Tailwind CSS" },
  { id: "motion", name: "framer-motion", alt: "Motion" },
  { id: "figma", name: "figma", alt: "Figma" },
  { id: "sanity", name: "sanity", alt: "Sanity" },
  { id: "vercel", name: "vercel", alt: "Vercel" },
  { id: "aws", name: "amazon-web-services", alt: "AWS" },
  { id: "bitcoin", name: "bitcoin", alt: "Bitcoin" },
  { id: "ethereum", name: "ethereum", alt: "Ethereum" },
  { id: "tether", name: "tether", alt: "Tether" },
  { id: "xrp", name: "ripple", alt: "XRP" },
  { id: "bnb", name: "binance-coin", alt: "BNB" },
  { id: "solana", name: "solana", alt: "Solana" },
  { id: "usdc", name: "usd-coin", alt: "USD Coin" },
  { id: "dogecoin", name: "dogecoin", alt: "Dogecoin" },
  { id: "tron", name: "tron", alt: "TRON" },
  { id: "cardano", name: "cardano", alt: "Cardano" },
  { id: "polkadot", name: "polkadot", alt: "Polkadot" },
  { id: "shiba", name: "shiba-inu", alt: "Shiba Inu" },
];

// Base URL for Icons8 API
const ICONS8_BASE_URL = "https://img.icons8.com/color/50/000000/";

const TechBlocks = () => {
  const [grid, setGrid] = useState<(typeof iconList[0] | null)[]>(Array(50).fill(null));
  const [animationStates, setAnimationStates] = useState<AnimationState>({});
  const [glowStates, setGlowStates] = useState<GlowState>({});
  const controls = useRef(useAnimation()).current;

  // Randomize block properties
  const randomizeBlock = () => {
    const newItem = Math.random() > 0.6 ? iconList[Math.floor(Math.random() * iconList.length)] : null;
    const direction = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
    const spin = Math.random() > 0.5 ? 1 : -1;
    const speed = 0.8 + Math.random() * 1.2;
    const rotateX = direction === "up" ? 90 * spin : direction === "down" ? -90 * spin : 0;
    const rotateY = direction === "left" ? -90 * spin : direction === "right" ? 90 * spin : 0;
    const rotateZ = Math.random() * 360;

    return { item: newItem, direction, spin, speed, rotateX, rotateY, rotateZ };
  };

  // Initialize and animate continuously
  useEffect(() => {
    const initialStates: AnimationState = {};
    const initialGlows: GlowState = {};
    const initialGrid = [...grid];
    for (let i = 0; i < 50; i++) {
      const { item, direction, spin, speed, rotateX, rotateY, rotateZ } = randomizeBlock();
      initialStates[i] = { direction, spin, speed, rotateX, rotateY, rotateZ };
      initialGlows[i] = Math.random() > 0.7
        ? Object.values(THEMED_COLORS)[Math.floor(Math.random() * Object.keys(THEMED_COLORS).length)]
        : "";
      if (item) initialGrid[i] = item;
    }
    setAnimationStates(initialStates);
    setGlowStates(initialGlows);
    setGrid(initialGrid);

    const interval = setInterval(() => {
      const randomIndices = Array.from(
        { length: Math.floor(Math.random() * 10) + 1 },
        () => Math.floor(Math.random() * 50)
      );
      randomIndices.forEach((index) => {
        const { item, direction, spin, speed, rotateX, rotateY, rotateZ } = randomizeBlock();
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[index] = item;
          return newGrid;
        });
        setAnimationStates((prev) => ({
          ...prev,
          [index]: { direction, spin, speed, rotateX, rotateY, rotateZ },
        }));
        setGlowStates((prev) => ({
          ...prev,
          [index]: Math.random() > 0.7
            ? Object.values(THEMED_COLORS)[Math.floor(Math.random() * Object.keys(THEMED_COLORS).length)]
            : "",
        }));
        controls.start({
          [index]: {
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            transition: { duration: speed, type: "spring", stiffness: 120, damping: 15 },
          },
        }).then(() => {
          controls.set({
            [index]: {
              rotateX,
              rotateY,
              rotateZ,
              transition: { duration: 0 },
            },
          });
        });
      });
    }, 1500);

    return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  // Animation variants for fluid rotation and reveal
  const blockVariants = {
    hidden: (custom: {
      rotateX: number;
      rotateY: number;
      rotateZ: number;
      speed: number;
    }) => ({
      opacity: 0,
      rotateX: custom.rotateX,
      rotateY: custom.rotateY,
      rotateZ: custom.rotateZ,
      scale: 0.9,
      transition: { duration: custom.speed, ease: "easeInOut" },
    }),
    visible: (custom: {
      rotateX: number;
      rotateY: number;
      rotateZ: number;
      speed: number;
    }) => ({
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      transition: { duration: custom.speed, type: "spring", stiffness: 120, damping: 15 },
    }),
  };

  return (
    <section className="bg-wizerd-darkestgrey py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-10 gap-2 p-4 bg-gray-900 rounded-lg shadow-[0_8px_20px_rgba(51,204,255,0.4),_0_4px_8px_rgba(0,0,0,0.6)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {grid.map((item, index) => (
            <AnimatePresence key={index}>
              {item && (
                <motion.div
                  className={`relative w-full h-16 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center ${glowStates[index] ? "glow-effect" : ""}`}
                  custom={animationStates[index]}
                  initial="hidden"
                  animate={controls}
                  exit="hidden"
                  variants={blockVariants}
                >
                  <Image
                    src={`${ICONS8_BASE_URL}${item.name}.png`}
                    alt={item.alt}
                    width={40}
                    height={40}
                    className="object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `${ICONS8_BASE_URL}question-mark.png`;
                    }}
                    unoptimized
                  />
                </motion.div>
              )}
              {!item && (
                <div
                  key={index}
                  className="w-full h-16 bg-gray-700/50 rounded-lg shadow-inner"
                ></div>
              )}
            </AnimatePresence>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechBlocks;