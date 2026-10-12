import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '../motion/FadeIn';
import type { Project, ProjectSection } from '../../types/sanity';

interface ProjectDetailSectionsProps {
  project: Project | null;
  isLoading?: boolean;
  className?: string;
}

export function ProjectDetailSections({ project, isLoading, className = '' }: ProjectDetailSectionsProps) {
  // Top 2 sections opened by default; max 2 sections open simultaneously (FIFO auto-collapse)
  const [openSectionIndices, setOpenSectionIndices] = useState<number[]>([0, 1]);

  React.useEffect(() => {
    setOpenSectionIndices([0, 1]);
  }, [project?._id]);

  const toggleSection = (idx: number) => {
    setOpenSectionIndices((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((i) => i !== idx);
      }
      if (prev.length >= 2) {
        // Automatically collapse the 1st one when a 3rd is opened
        return [prev[prev.length - 1], idx];
      }
      return [...prev, idx];
    });
  };

  if (isLoading || !project) {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        <div className="h-5 w-1/3 bg-brand-surface animate-pulse rounded-[2px]" />
        <div className="h-14 w-full bg-brand-surface animate-pulse rounded-[2px]" />
        <div className="h-px w-full bg-brand-border my-2" />
        <div className="h-5 w-1/3 bg-brand-surface animate-pulse rounded-[2px]" />
        <div className="h-14 w-full bg-brand-surface animate-pulse rounded-[2px]" />
      </div>
    );
  }

  // Use nested sections from Sanity; fallback to engineering defaults if not populated yet
  const sections: ProjectSection[] = (project.sections && project.sections.length > 0)
    ? project.sections
    : [
        {
          title: 'Architecture & Challenge',
          explanation: "Designing a high-throughput, low-latency architecture capable of handling concurrent operations while maintaining strict data consistency.",
        },
        {
          title: 'Engineering Solution',
          explanation: 'Implemented resilient retry queues, optimized database indexing schemes, and modular service boundaries to deliver reliable, observable performance.',
        },
      ];

  return (
    <FadeIn delay={0.1} className={`w-full ${className}`}>
      <div className="flex flex-col">
        {sections.map((section, idx) => {
          const isOpen = openSectionIndices.includes(idx);
          return (
            <div 
              key={section._key || idx} 
              className="border-b border-brand-border first:border-t-0"
            >
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between cursor-pointer group py-3 text-left focus:outline-none transition-opacity hover:opacity-75"
                aria-expanded={isOpen}
              >
                <span className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(18,18,18)]">
                  {section.title}
                </span>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-3.5 h-3.5 text-[rgb(18,18,18)] transition-transform duration-300 shrink-0 ml-2"
                >
                  <path 
                    d={isOpen ? "M5 12h14" : "M12 5v14 M5 12h14"} 
                    style={{ transition: 'd 0.3s ease' }} 
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-geist font-medium text-[16px] leading-[22px] tracking-[-0.025em] text-[rgb(117,117,117)] pb-4">
                      {section.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </FadeIn>
  );
}
