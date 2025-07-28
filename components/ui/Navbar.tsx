"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/data/index";

const Navbar: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = scrollY.get();
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    return scrollY.on("change", handleScroll);
  }, [scrollY]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Hamburger icon animation
  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  // Dropdown menu animation
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.nav
      className="flex items-center justify-between px-4 sm:px-6 py-4 bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm fixed w-full z-50 top-0"
      style={{
        borderBottom: "1px solid #ff33cc",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='rgb(40,40,40)' fill-opacity='0.2' viewBox='0 0 100 169.5'%3E%3Cpolygon points='50,34.75 93.5,59.75 93.5,109.75 50,134.75 6.5,109.75 6.5,59.75'/%3E%3Cpolygon points='0,-50 43.5,-25 43.5,25 0,50 -43.5,25 -43.5,-25'/%3E%3Cpolygon points='100,-50 143.5,-25 143.5,25 100,50 56.5,25 56.5,-25'/%3E%3Cpolygon points='0,119.5 43.5,144.5 43.5,194.5 0,219.5 -43.5,194.5 -43.5,144.5'/%3E%3Cpolygon points='100,119.5 143.5,144.5 143.5,194.5 100,219.5 56.5,194.5 56.5,144.5'/%3E%3C/svg%3E")`,
        backgroundSize: "32px",
      }}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/#hero" className="font-ubuntu font-bold text-lg sm:text-xl md:text-2xl">
          <span className="text-bitcoin-orange">₿itcoin</span>
          <span className="text-alien-green">Wizerd</span>
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex flex-grow justify-center space-x-2 sm:space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="text-wizerd-blue hover:text-cyber-yellow text-sm sm:text-base md:text-lg transition-colors font-ubuntu"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Side: Search, Hamburger, Sign In, Get Started */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search Bubble */}
        <motion.div
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
        </motion.div>

        {/* Hamburger Icon (Mobile) */}
        <motion.button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.div
            variants={hamburgerVariants}
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
          </motion.div>
        </motion.button>

        {/* Sign In/Out */}
        <button
          onClick={() => setIsSignedIn(!isSignedIn)}
          className="text-wizerd-blue hover:text-cyber-yellow text-sm sm:text-base transition-colors font-ubuntu"
        >
          {isSignedIn ? "Sign Out" : "Sign In"}
        </button>

        {/* Get Started */}
        <Link href="/get-started">
          <motion.button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-bitcoin-orange text-white rounded-lg hover:bg-cyber-yellow hover:text-black text-sm sm:text-base transition font-ubuntu"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </Link>
      </div>

      {/* Dropdown Menu (Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 w-full bg-[rgb(30,30,30)] bg-opacity-90 backdrop-blur-sm border-b border-[#ff33cc]"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col space-y-2 py-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="text-wizerd-blue hover:text-cyber-yellow text-sm sm:text-base transition-colors font-ubuntu py-2 px-3 hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;