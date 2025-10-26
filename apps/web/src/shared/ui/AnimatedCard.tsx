'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  index: number;
  animationType?: 'spring' | 'ease';
}

export default function AnimatedCard({
  children,
  index,
  animationType = 'ease',
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: animationType === 'spring' ? 0 : 20,
        scale: animationType === 'spring' ? 0.9 : 1,
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        ...(animationType === 'spring'
          ? {
              type: 'spring',
              stiffness: 300,
              damping: 20,
              mass: 0.8,
            }
          : {
              duration: 0.5,
            }),
      }}
    >
      {children}
    </motion.div>
  );
}
