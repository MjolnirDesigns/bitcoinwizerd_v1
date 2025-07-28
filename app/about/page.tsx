// app/about/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Marquee from "@/components/ui/Marquee";
import { affiliateLogos } from "@/data/marqueeData";
import { cn } from "@/lib/utils";
import SubscriberWizerd from "@/components/ui/SubscriberWizerd";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function About() {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  const milestoneColors: { [key: string]: string } = {
    2023: "#ff9900", // bitcoin-orange
    2024: "#ccff00", // cyber-yellow
    2025: "#33e000", // alien-green
    2026: "#33ccff", // wizerd-blue
  };

  return (
    <div className={cn("min-h-screen bg-wizerd-darkestgrey")}>
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* BitcoinWizerd Mission Header and Text Block */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div
            className={cn(
              "bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-lg p-6 mb-6 about-header-container"
            )}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-ubuntu text-center">
              <span className="text-wizerd-blue">About</span>{" "}
              <span className="text-bitcoin-orange">₿itcoin</span>
              <span className="text-alien-green">Wizerd</span>
            </h1>
          </div>
          <div className="text-wizerd-blue font-ubuntu text-base sm:text-lg leading-relaxed">
            <p className="mb-4 text-center">
              At BitcoinWizerd, our mission is to empower developers and web wizerds with the knowledge and tools to navigate the world of Bitcoin and cryptocurrencies. We engage users with community-driven projects, build developer kits and tools, and create educational content for Bitcoiners.
            </p>
            <p className="text-center">
              From Normie Plebs to Bitcoin Maxis. Once you take the red pill, we show you how deep the rabbit hole really goes. Defi the dollar with BitcoinWizerd!
            </p>
          </div>
        </motion.div>

        {/* Video Banner */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <video
            src="/assets/videos/BitcoinBanner.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-lg object-cover"
            width={1200}
            height={400}
          />
        </motion.div>

        {/* Affiliates Header and Scrolling Marquee */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-ubuntu text-bitcoin-orange mb-6 text-center">
            Affiliates
          </h2>
          <Marquee logos={affiliateLogos} direction="left" speed={20} gap={48} />
        </motion.div>

        {/* Number Impact Header and Bento Box Blocks */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-ubuntu text-bitcoin-orange mb-6 text-center">
            Analytics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Users", value: "1K+", description: "Active users on our platform" },
              { label: "Developers", value: "75+", description: "Building with our DevKit" },
              { label: "Transactions", value: "100+", description: "Processed via our tools" },
              { label: "Monthly Visits", value: "50+", description: "Growing interactions" },
              { label: "Subscribers", value: "250", description: "Subscribers viewing our content" },
              { label: "Countries", value: "10", description: "Global reach" },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="bg-gray-800 rounded-lg p-6 text-center border border-punk-pink shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-cyber-yellow">{item.value}</h3>
                <p className="text-wizerd-blue font-ubuntu">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones Header and Timeline */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-ubuntu text-bitcoin-orange mb-6 text-center">
            Milestones
          </h2>
          <div className="relative">
            {[
              {
                year: 2023,
                month: "July",
                accomplishment: "The BitcoinWizerd was first conceptualized.",
                colorClass: "about-milestone-dot-2023",
              },
              {
                year: 2024,
                month: "June",
                accomplishment: "The first BitcoinWizerd website was published.",
                colorClass: "about-milestone-dot-2024",
              },
              {
                year: 2025,
                month: "July",
                accomplishment: "New and improved BitcoinWizerd website is released.",
                colorClass: "about-milestone-dot-2025",
              },
              {
                year: 2026,
                month: "January",
                accomplishment: "Target date to release our AI Agent, API, Component Library, DevKit, Web3 Integration Toolkit and more.",
                colorClass: "about-milestone-dot-2026",
              },
            ].map((milestone) => (
              <motion.div
                key={milestone.year}
                className="flex items-center mb-12 tw-mt-12"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredYear(String(milestone.year))}
                onMouseLeave={() => setHoveredYear(null)}
              >
                <div className="flex-shrink-0 mr-16">
                  <div className={cn("about-milestone-dot", milestone.colorClass)}>
                    <span className="text-white text-sm font-bold"></span>
                  </div>
                </div>
                <div className="flex-1">
                  <motion.div
                    className="bg-gray-800 bg-opacity-50 p-2 rounded-sm border border-gray-600 hover:shadow-glow"
                    style={{
                      boxShadow: hoveredYear === String(milestone.year)
                        ? `0 0 15px ${milestoneColors[milestone.year]}`
                        : 'none',
                    }}
                    variants={cardVariants}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-cyber-yellow">{milestone.year}</h3>
                    <p className="text-lg md:text-xl text-wizerd-blue">{milestone.month}</p>
                    <p className="text-gray-400 font-ubuntu text-base md:text-lg leading-3">
                      {milestone.accomplishment}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
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
          <h2 className="text-2xl sm:text-3xl font-bold font-ubuntu text-bitcoin-orange mb-6 text-center">
            Subscribe!
          </h2>
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