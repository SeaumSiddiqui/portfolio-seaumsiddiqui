import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Heading({ children, className = '', as: Component = 'h2' }: TypographyProps) {
  return (
    <Component className={`font-geist font-medium text-brand-text ${className}`}>
      {children}
    </Component>
  );
}

export function Text({ children, className = '', as: Component = 'p' }: TypographyProps) {
  return (
    <Component className={`font-inter font-semibold text-brand-text ${className}`}>
      {children}
    </Component>
  );
}
