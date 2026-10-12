import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  parallaxAmount?: number;
}

export function ParallaxImage({ 
  src, 
  alt, 
  className = '', 
  imageClassName = '',
  parallaxAmount = 50 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxAmount, parallaxAmount]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <motion.img
        style={{ y, scale: 1.1 }} // Scale up slightly to prevent empty space during parallax
        src={src}
        alt={alt}
        className={`w-full h-full object-cover origin-center ${imageClassName}`}
      />
    </div>
  );
}
