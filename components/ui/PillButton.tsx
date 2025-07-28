'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

interface PillButtonProps {
  children: React.ReactNode;
  color: 'blue' | 'red';
  delay?: number; // For animation stagger
  className?: string;
  // Remove onClick from props to ensure serializability
}

export function PillButton({ children, color, delay = 0, className }: PillButtonProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(0); // Start at scale 0 for animation

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const target = e.currentTarget as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (clientX - centerX) / 10;
      const deltaY = (clientY - centerY) / 10;
      rotateX.set(-deltaY);
      rotateY.set(deltaX);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1); // Reset to 1 on leave, animation handles initial scale
    };

    const handleMouseEnter = () => {
      scale.set(1.05);
    };

    const button = document.querySelector(`[data-pill="${color}"]`) as HTMLButtonElement | null;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove as EventListener);
      button.addEventListener('mouseleave', handleMouseLeave as EventListener);
      button.addEventListener('mouseenter', handleMouseEnter as EventListener);
    }

    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove as EventListener);
        button.removeEventListener('mouseleave', handleMouseLeave as EventListener);
        button.removeEventListener('mouseenter', handleMouseEnter as EventListener);
      }
    };
  }, [color, rotateX, rotateY, scale]);

  const getBaseStyles = () => {
    const base = 'py-2 px-6 text-sm sm:text-base text-white rounded-full font-ubuntu transition-all duration-300';
    switch (color) {
      case 'blue':
        return cn(base, 'bg-mystic-blue', 'hover:bg-wizerd-blue', 'active:bg-mystic-blue/80');
      case 'red':
        return cn(base, 'bg-crimson-darkred', 'hover:bg-blood-red', 'active:bg-crimson-darkred/80');
      default:
        return base;
    }
  };

  return (
    <motion.button
      data-pill={color}
      className={cn(getBaseStyles(), className)}
      style={{
        rotateX: rotateX, // Use individual transform properties
        rotateY: rotateY,
        scale: scale,
      }}
      initial={{ scale: 0 }} // Restore old animation
      animate={{ scale: 1 }} // Restore old animation
      transition={{ duration: 0.5, delay, ease: 'easeOut' }} // Use delay prop
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
      custom={{ rotateX, rotateY, scale }} // Pass motion values for transforms
    >
      {children}
    </motion.button>
  );
}