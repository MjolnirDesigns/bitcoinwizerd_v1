// components/ui/SubscriberWizerd.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SubscriberWizerdProps {
  title?: string | React.ReactNode;
  description?: string;
  buttonText?: string;
  className?: string;
  onSubscribe?: (email: string) => void;
}

const SubscriberWizerd: React.FC<SubscriberWizerdProps> = ({
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
        className="bg-gray-800 p-6 sm:p-8 rounded-xl border border-mystic-blue shadow-[0_0_15px_rgba(0,51,255,0.3)]"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,51,255,0.1), rgba(30,144,255,0.1))`,
        }}
      >
        <h2 className="text-xl sm:text-2xl font-bold font-ubuntu text-center mb-4 line-clamp-1">
          {renderTitle()}
        </h2>
        <p className="text-wizerd-blue font-ubuntu text-center mb-6 text-sm sm:text-base">
          {description}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-3 rounded-lg bg-gray-800 text-wizerd-blue border border-gray-700 focus:outline-none focus:ring-2 focus:ring-bitcoin-orange w-full sm:w-auto text-xs sm:text-sm"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-bitcoin-orange text-white rounded-lg hover:bg-cyber-yellow hover:text-black transition font-ubuntu font-bold text-xs sm:text-sm min-w-[120px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Subscribing..." : buttonText}
          </motion.button>
        </form>
        {message && (
          <p className="text-center mt-4 text-xs sm:text-sm font-ubuntu text-alien-green">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default SubscriberWizerd;