'use client'; // Marks this component as client-side only

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function TypedText() {
  const [text, setText] = useState('');
  const [currentString, setCurrentString] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  const quotes = [
    '"You take the <span class="text-wizerd-blue">blue pill</span>, the story ends. You wake up in your bed and believe whatever you want to believe."',
    '"You take the <span class="text-blood-red">red pill</span>, you stay in Wonderland, and I show you how deep the rabbit hole goes..." ~Morpheus',
  ];

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const frameDuration = 50; // Target duration per character in ms (adjust for speed)

      if (charIndex < quotes[currentString].length && progress >= frameDuration) {
        setText((prev) => prev + quotes[currentString][charIndex]);
        setCharIndex((prev) => prev + 1);
        startTime = timestamp; // Reset start time for next character
      } else if (charIndex >= quotes[currentString].length) {
        setTimeout(() => {
          setText('');
          setCharIndex(0);
          setCurrentString((prev) => (prev + 1) % quotes.length);
          startTime = null; // Reset for next loop
        }, 2000); // 2-second pause
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentString, charIndex, quotes]);

  return (
    <div
      ref={textRef}
      className={cn('typed-text')}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}