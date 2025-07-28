// app/projects/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import SubscriberWizerd from "@/components/ui/SubscriberWizerd";
import WizerdPillCTA from "@/components/ui/WizerdPillCTA"; // Assuming this is defined
import { cn } from "@/lib/utils";

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ProjectCard Component (adapted from ServiceCard in services/page.tsx)
const ProjectCard: React.FC<{
  name: string;
  description: string;
  link: string;
  position?: number; // To determine animation direction
}> = ({ name, description, link, position = 1 }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center"
      initial={{ x: position % 2 === 1 ? "-100%" : "100%", opacity: 0 }} // Slide from left or right based on position
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h3 className="text-2xl font-bold text-cyber-yellow mb-4">{name}</h3>
      <div className="w-48 h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
        {/* Placeholder image */}
        <span className="text-gray-400">Image Placeholder</span>
      </div>
      <p className="text-white mb-4">{description}</p>
      <WizerdPillCTA href={link} className="mt-4">
        Learn More
      </WizerdPillCTA>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <div className={cn("min-h-screen bg-wizerd-darkestgrey")}>
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 md:px-8">
        {/* Projects Header and Text Block */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div
            className={cn(
              "bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm rounded-lg p-6 mb-6 projects-header-container"
            )}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-ubuntu text-center">
              <span className="text-bitcoin-orange">₿itcoin</span>
              <span className="text-alien-green">Wizerd</span>{" "}
              <span className="text-wizerd-blue">Projects</span>
            </h1>
          </div>
          <div className="text-wizerd-blue font-ubuntu text-base sm:text-lg leading-relaxed"></div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="max-w-7xl mx-auto mb-20 tw-mt-12 tw-justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-ubuntu text-bitcoin-orange mb-6 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              name="Project 1"
              description="Placeholder: Future home for Project 1 showcase by BitcoinWizerd."
              link="/projects/project-1" // Placeholder link
              position={1} // Slide from left
            />
            <ProjectCard
              name="Project 2"
              description="Placeholder: Future home for Project 2 showcase by BitcoinWizerd."
              link="/projects/project-2" // Placeholder link
              position={2} // Slide from right
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