import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className = '', as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={`w-full max-w-container-max mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </Component>
  );
}
