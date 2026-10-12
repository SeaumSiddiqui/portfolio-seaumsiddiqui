import React from 'react';
import { motion } from 'motion/react';

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function RevealText({ text, delay = 0, className = '' }: RevealTextProps) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}
