import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// BitcoinWizerd color themes with organized gradient shades
const THEMED_COLORS: { [key: string]: string } & {
  // Crown-Chakra Gradient
  "Crown-Extra-Light": string;
  "Crown-Light": string;
  "Crown-Chakra": string;

  // Punk-Pink Gradient
  "Punk-Extra-Light": string;
  "Punk-Light": string;
  "Punk-Pink": string;

  // Bitcoin-Orange Gradient
  "Bitcoin-Extra-Light": string;
  "Bitcoin-Light": string;
  "Bitcoin-Orange": string;
  "Bitcoin-Dark": string;
  "Bitcoin-Extra-Dark": string;

  // Cyber-Yellow Gradient
  "Cyber-Extra-Light": string;
  "Cyber-Yellow": string;

  // Alien-Green Gradient
  "Alien-Extra-Light": string;
  "Alien-Green": string;

  // Wizerd-Blue Gradient
  "Wizerd-Extra-Light": string;
  "Wizerd-Blue": string;

  // Mystic-Blue Gradient
  "Mystic-Extra-Light": string;
  "Mystic-Blue": string;
} = {
  // Crown-Chakra Gradient
  "Crown-Extra-Light": "#e6ccff",
  "Crown-Light": "#d9b3ff",
  "Crown-Chakra": "#8400ff",

  // Punk-Pink Gradient
  "Punk-Extra-Light": "#ff99ff",
  "Punk-Light": "#ff66ff",
  "Punk-Pink": "#ff33cc",

  // Bitcoin-Orange Gradient
  "Bitcoin-Extra-Light": "#ffcc33",
  "Bitcoin-Light": "#ffbb00",
  "Bitcoin-Orange": "#ff9900",
  "Bitcoin-Dark": "#ff7700",
  "Bitcoin-Extra-Dark": "#cc6600",

  // Cyber-Yellow Gradient
  "Cyber-Extra-Light": "#ffff66",
  "Cyber-Yellow": "#ffff00",

  // Alien-Green Gradient
  "Alien-Extra-Light": "#66ff99",
  "Alien-Green": "#33e000",

  // Wizerd-Blue Gradient
  "Wizerd-Extra-Light": "#99e6ff",
  "Wizerd-Blue": "#33ccff",

  // Mystic-Blue Gradient
  "Mystic-Extra-Light": "#99ccff",
  "Mystic-Blue": "#0033ff",
};

// Props interface
interface WizerdPillCTAProps {
  children: React.ReactNode;
  href?: string;
  color?: keyof typeof THEMED_COLORS;
  onClick?: () => void;
  className?: string;
}

const buttonVariants = {
  initial: {
    scale: 1,
    rotate: 0,
    boxShadow: `0 4px 12px ${THEMED_COLORS["Bitcoin-Extra-Dark"]}15`, // Default subtle shadow
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: { duration: 0.3, type: "spring", stiffness: 100 },
    boxShadow: `0 6px 18px ${THEMED_COLORS["Bitcoin-Extra-Light"]}25, 0 4px 10px ${THEMED_COLORS["Bitcoin-Light"]}20`, // Hover glow
  },
  pulse: {
    scale: [1.05, 1.1, 1.05],
    transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" },
  },
  tap: {
    scale: 0.9,
    rotate: 0,
    transition: { duration: 0.2 },
    boxShadow: `0 2px 6px ${THEMED_COLORS["Bitcoin-Dark"]}40, inset 0 2px 4px ${THEMED_COLORS["Bitcoin-Orange"]}15`,
  },
};

const WizerdPillCTA: React.FC<WizerdPillCTAProps> = ({
  children,
  href,
  color = "Bitcoin-Orange",
  onClick,
  className = "",
}) => {
  // Determine if the color is a Bitcoin-Orange variant for special gradient
  const isBitcoinOrangeVariant = ["Bitcoin-Orange", "Bitcoin-Light", "Bitcoin-Dark", "Bitcoin-Extra-Light", "Bitcoin-Extra-Dark"].includes(color as string);
  const baseColor = THEMED_COLORS[color] || THEMED_COLORS["Bitcoin-Orange"];
  const gradientColors = isBitcoinOrangeVariant
    ? {
        extraLight: THEMED_COLORS["Bitcoin-Extra-Light"],
        light: THEMED_COLORS["Bitcoin-Light"],
        base: THEMED_COLORS["Bitcoin-Orange"],
        dark: THEMED_COLORS["Bitcoin-Dark"],
        extraDark: THEMED_COLORS["Bitcoin-Extra-Dark"],
      }
    : {
        extraLight: `${baseColor}ee`,
        light: `${baseColor}dd`,
        base: baseColor,
        dark: `${baseColor}99`,
        extraDark: `${baseColor}66`,
      };

  const buttonContent = (
    <motion.button
      className={`relative px-6 py-3 rounded-full font-ubuntu text-white text-sm sm:text-base font-semibold overflow-hidden transition-all duration-300 ${className}`}
      style={
        {
          background: `radial-gradient(ellipse at top left, ${gradientColors.extraLight} 0%, ${gradientColors.light} 25%, ${gradientColors.base} 50%, ${gradientColors.dark} 75%, ${gradientColors.extraDark} 100%)`, // Oval gradient
        } as React.CSSProperties
      }
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      animate={["pulse"]} // Pulse runs continuously, hover overrides when active
      whileTap="tap"
      onClick={onClick}
    >
      {/* Inner glowing layer with oval gradient */}
      <motion.span
        className="absolute inset-0 opacity-70"
        style={
          {
            background: isBitcoinOrangeVariant
              ? `radial-gradient(ellipse at top left, ${gradientColors.extraLight}30 0%, ${gradientColors.light}20 30%, ${gradientColors.base}10 60%, ${gradientColors.dark}05 80%, transparent 100%)`
              : `radial-gradient(ellipse at top left, ${baseColor}40 0%, ${baseColor}20 30%, ${baseColor}10 60%, ${baseColor}05 80%, transparent 100%)`,
          } as React.CSSProperties
        }
        animate={{
          rotate: 360,
          transition: { duration: 10, repeat: Infinity, ease: "linear" },
        }}
      />
      {/* Button text */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  return href ? <Link href={href}>{buttonContent}</Link> : buttonContent;
};

export default WizerdPillCTA;