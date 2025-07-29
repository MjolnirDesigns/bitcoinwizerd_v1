"use client";

export const dynamic = 'force-dynamic'; // Add this to make the page dynamic

import { useSession } from "next-auth/react";
import Hero from "@/components/ui/Hero";
import Navbar from "@/components/ui/Navbar";
import BitcoinSection from "@/components/sections/BitcoinSection";
import CryptoSection from "@/components/sections/CryptoSection";
import DevKitSection from "@/components/sections/DevKitSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SubscriptionsSection from "@/components/sections/SubscriptionsSection";
import RacerLine from "@/components/animations/RacerLine";
import { Footer } from "@/components/ui/Footer";
import "tailwindcss/tailwind.css";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="min-h-screen bg-bg-dark flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <div className="min-h-screen bg-bg-dark flex items-center justify-center">Please log in to access this page.</div>;
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <Navbar />
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        <RacerLine themeColor="punk-pink" />
        <Hero />
        <RacerLine themeColor="bitcoin-orange" />
        <BitcoinSection />
        <RacerLine themeColor="cyber-yellow" />
        <CryptoSection />
        <RacerLine themeColor="alien-green" />
        <DevKitSection />
        <RacerLine themeColor="wizerd-blue" />
        <ProjectsSection />
        <RacerLine themeColor="mystic-blue" />
        <ServicesSection />
        <RacerLine themeColor="crown-chakra" />
        <SubscriptionsSection />
      </main>
      <Footer />
    </div>
  );
}