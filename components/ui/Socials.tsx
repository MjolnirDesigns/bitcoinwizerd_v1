// app/components/ui/Socials.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bitcoin, Github, Instagram, Youtube, Twitter, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialsProps {
  className?: string;
}

const socialLinks = [
  { name: "Bitcoin", icon: Bitcoin, href: "" },
  { name: "GitHub", icon: Github, href: "https://github.com/BitcoinWizerd" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/BitcoinWizerd" },
  { name: "TikTok", icon: Music, href: "https://tiktok.com/@BitcoinWizerd" },
  { name: "X", icon: Twitter, href: "https://x.com/BitcoinWizerd" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@BitcoinWizerd" },
];

const Socials: React.FC<SocialsProps> = ({ className }) => {
  return (
    <div className={cn("flex justify-center space-x-4 sm:space-x-6 py-4", className)}>
      {socialLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-wizerd-blue hover:text-bitcoin-orange p-2 rounded-full"
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{ rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <link.icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.a>
      ))}
    </div>
  );
};

export default Socials;