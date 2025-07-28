// components/ui/Subscribe.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SubscribeProps {
  title?: string | React.ReactNode;
  description?: string;
  buttonText?: string;
  className?: string;
  onSubscribe?: (email: string) => void;
}

const Subscribe: React.FC<SubscribeProps> = ({
  title = "₿itcoinWizerd Newsletter",
  description = "High Vibe Bitcoin and crypto insights. Subscribe now!",
  buttonText = "Subscribe",
  className,
  onSubscribe,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (onSubscribe) onSubscribe(email);
      setMessage("You're In!");
      setEmail("");
    } catch {
      setMessage("Error. Try again.");
    }
    setIsSubmitting(false);
  };

  const renderTitle = () => {
    if (typeof title !== "string") return title;
    return (
      <>
        <span className="text-bitcoin-orange">₿itcoin</span>
        <span className="text-alien-green">Wizerd</span>
        <span className="text-wizerd-blue"> Newsletter</span>
      </>
    );
  };

  return (
    <motion.div
      className={cn("max-w-2xl mx-auto mb-12", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-punk-pink shadow-[0_0_15px_rgba(255,51,204,0.3)]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,51,204,0.1), rgba(30,144,255,0.1))`,
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold font-ubuntu text-center mb-4">
          {renderTitle()}
        </h2>
        <p className="text-wizerd-blue font-ubuntu text-center mb-6 text-base sm:text-lg">
          {description}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-3 rounded-lg bg-gray-800 text-wizerd-blue border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bitcoin-orange w-full sm:w-auto"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-bitcoin-orange text-white rounded-lg hover:bg-cyber-yellow hover:text-black transition font-ubuntu font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Subscribing..." : buttonText}
          </motion.button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm font-ubuntu text-alien-green">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Subscribe;