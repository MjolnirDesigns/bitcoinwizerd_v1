import React from 'react';
import { motion } from 'framer-motion';

interface RacerLineProps {
  themeColor: string;
}

const colorMap: { [key: string]: string } = {
  'punk-pink': '#ff33cc',
  'bitcoin-orange': '#FF9900',
  'cyber-yellow': '#FFFC00',
  'alien-green': '#33E000',
  'wizerd-blue': '#33ccFF',
  'mystic-blue': '#0033FF',
  'crown-chakra': '#8400FF',
};

const RacerLine: React.FC<RacerLineProps> = ({ themeColor }) => {
  const bgColor = colorMap[themeColor] || '#FFFFFF'; // Fallback to white if themeColor is invalid

  return (
    <motion.div
      className="h-1 w-full my-2 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute h-full w-1/3"
        style={{ backgroundColor: bgColor, boxShadow: `0 0 10px ${bgColor}, 0 0 20px ${bgColor}` }}
        animate={{ x: ['-100%', '300%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />
    </motion.div>
  );
};

export default RacerLine;