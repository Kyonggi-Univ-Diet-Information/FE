'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface ReviewAnimatedCardProps {
  children: ReactNode;
  index: number;
}

export default function ReviewAnimatedCard({
  children,
  index,
}: ReviewAnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}
