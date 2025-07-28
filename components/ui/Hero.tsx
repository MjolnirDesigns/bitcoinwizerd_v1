"use client"; // Required for client-side interactivity

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Spotlight } from "../ui/Spotlight";


export default function Hero() {
    // Animation variants for the logo
    const logoVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            y: -20,
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    // Animation variants for the text (slide up)
    const textVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: -75,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
        },
    };

        // Scroll to top on page load
    useEffect(() => {
        // Disable browser scroll restoration
        if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
        }
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures this runs only on mount (page load)

    return (
        <div className="bg-wizerd-darkestgrey text-white font-ubuntu relative overflow-hidden">
            <div className="relative min-h-screen w-full flex items-center justify-center">
                <Spotlight
                    className="absolute -top-10 -left-8 sm:-top-20 sm:-left-8 md:-top-12 md:left-28 lg:top-20 lg:left-72 h-[50vh] sm:h-[80vh] md:h-screen"
                    fill="#FFD700" // Gold
                />
                <Spotlight
                    className="absolute top-0 left-4 sm:-top-24 sm:left-8 md:-top-50 md:left-52 lg:left-72 h-[50vh] sm:h-[80vh] md:h-screen"
                    fill="#C0C0C0"  // Silver
                />
                <Spotlight
                    className="absolute top-20 left-20 sm:top-12 sm:left-10 md:top-10 md:left-16 lg:left-8 h-[20vh] sm:h-[60vh] md:h-[80vh] w-[30vw] sm:w-[40vw] md:w-[50vw]"
                    fill="#ff9900" // Bitcoin Orange
                />

                <div className="absolute flex flex-cols h-screen w-full items-center justify-center dark:bg-black">

                    
                
                    {/* Background Grid */}
                    <div className={clsx(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                        )}
                    />

                    {/* Radial gradient for the container to give a faded look */}
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-wizerd-darkestgrey" />
                    
                    
                    <div className="flex justify-center relative my-4 z-10">
                        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={logoVariants}
                        >
                        <Image
                            className="w-64 md:w-[20rem] lg:w-[25rem] xl:w-[30rem] object-contain mb-4"
                            src="/assets/images/BW_Logo.png"
                            alt="Logo"
                            width={1024}
                            height={768}
                        />
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                        >
                        <h1 className=" text-center text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-bitcoin-orange font-ubuntu">
                            ₿itcoin<span className="text-alien-green">Wizerd</span>
                        </h1>
                        <h2 className="text-center uppercase tracking-wider mt-4 sm:text-me md:text-2xl text-wizerd-blue">
                            &quot;That&apos;s good! You&apos;ve taken your first step into a larger world.&quot; <br />
                            ~Obi-Wan Kenobi
                        </h2>
                        </motion.div>

                        {/* Orange Glowing Eclipsed Planet Effect with Motion */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
