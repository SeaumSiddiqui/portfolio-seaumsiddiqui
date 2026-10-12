import React from 'react';
import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline';
  asChild?: boolean;
}

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-semibold transition-colors duration-200 rounded-full";
  
  const variants = {
    primary: "bg-brand-text text-brand-bg hover:bg-brand-muted px-6 py-3",
    outline: "bg-transparent border border-brand-border text-brand-text hover:bg-brand-surface px-6 py-3"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
