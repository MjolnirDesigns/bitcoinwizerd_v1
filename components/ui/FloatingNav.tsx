'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: React.ReactElement }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      const previous = scrollYProgress.getPrevious();

      if (typeof previous === 'number') {
        const direction = current - previous;

        if (scrollYProgress.get() < 0.05) {
          setVisible(false);
        } else {
          if (direction < 0) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'flex max-w-fit fixed top-10 inset-x-0 mx-auto border dark:border-white/[0.2] rounded-lg bg-wizerd-darkestgrey z-[5000] px-6 py-3 items-center justify-center space-x-3 sm:space-x-4',
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              'relative items-center flex space-x-1',
              'text-bitcoin-orange font-ubuntu',
              pathname === navItem.link ? 'text-alien-green font-bold' : '',
              'hover:text-cyber-yellow',
              'transition-colors text-sm sm:text-base'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="!cursor-pointer">{navItem.name}</span>
          </Link>
        ))}
        <Link href="/login">
          <motion.button
            className={cn(
              'border text-sm sm:text-base font-ubuntu font-bold relative border-neutral-200 dark:border-white/[0.2] px-3 py-1 sm:px-4 sm:py-2 rounded-full',
              'text-bitcoin-orange',
              'hover:text-cyber-yellow',
              'transition-colors'
            )}
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </Link>
        <Link href="/get-started">
          <motion.button
            className={cn(
              'px-3 py-1 sm:px-4 sm:py-2 bg-bitcoin-orange text-white rounded-lg',
              'hover:bg-cyber-yellow hover:text-black',
              'transition font-ubuntu text-sm sm:text-base'
            )}
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};