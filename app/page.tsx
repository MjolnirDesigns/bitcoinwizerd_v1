// app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MatrixRain } from '@/components/animations/MatrixRain';
import { PillButton } from '@/components/ui/PillButton';
import { cn } from '@/lib/utils';
import TypedText from '@/components/animations/TypedText';

export default function Choice() {
  return (
    <div className={cn('matrixRainContainer relative min-h-screen bg-bg-dark overflow-hidden theme-bitcoin-orange w-full')}>
      <MatrixRain />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 border-none">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-normal font-ubuntu text-alien-green text-center whitespace-nowrap tracking-tighter border-none"
        >
          What is <span className="text-bitcoin-orange">Bitcoin?</span>
        </motion.h1>
        <div
          className={cn(
            'text-alien-green font-geo text-center mt-6 sm:mt-8 border-none',
            'min-h-[180px] max-w-[650px] overflow-hidden',
            'text-lg sm:text-xl md:text-2xl lg:text-3xl'
          )}
        >
          <TypedText />
          <style jsx>{`
            .typed-text span.text-wizerd-blue {
              color: var(--wizerd-blue);
            }
            .typed-text span.text-blood-red {
              color: var(--blood-red);
            }
            .typed-text {
              color: var(--alien-green);
            }
          `}</style>
        </div>
        <div className={cn('flex flex-row gap-4 justify-center mt-8 sm:mt-10 border-none')}>
          <Link href="/access-denied" passHref>
            <PillButton color="blue" delay={0.5}>
              Blue Pill
            </PillButton>
          </Link>
          <Link href="/login" passHref>
            <PillButton color="red" delay={0.5}>
              Red Pill
            </PillButton>
          </Link>
        </div>
      </div>
    </div>
  );
}