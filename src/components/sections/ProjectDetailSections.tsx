import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { FadeIn } from '../motion/FadeIn';
import type { Project, ProjectSection } from '../../types/sanity';

interface ProjectDetailSectionsProps {
  project: Project | null;
  isLoading?: boolean;
  className?: string;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-geist font-medium text-[15px] sm:text-[16px] leading-[22px] tracking-[-0.02em] text-[rgb(117,117,117)] mb-3 last:mb-0">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h3 className="font-geist font-semibold text-[18px] leading-[24px] text-[rgb(18,18,18)] mt-4 mb-2 first:mt-0">
        {children}
      </h3>
    ),
    h2: ({ children }) => (
      <h4 className="font-geist font-semibold text-[16px] leading-[22px] text-[rgb(18,18,18)] mt-3.5 mb-1.5 first:mt-0">
        {children}
      </h4>
    ),
    h3: ({ children }) => (
      <h5 className="font-geist font-semibold text-[15px] leading-[20px] text-[rgb(18,18,18)] mt-3 mb-1 first:mt-0">
        {children}
      </h5>
    ),
    h4: ({ children }) => (
      <h6 className="font-geist font-semibold text-[14px] leading-[19px] text-[rgb(18,18,18)] mt-2.5 mb-1 first:mt-0">
        {children}
      </h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-brand-border pl-3 my-3 text-[rgb(117,117,117)] italic font-geist text-[15px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-4 my-2.5 space-y-1.5 font-geist font-medium text-[15px] sm:text-[16px] leading-[22px] tracking-[-0.02em] text-[rgb(117,117,117)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-4 my-2.5 space-y-1.5 font-geist font-medium text-[15px] sm:text-[16px] leading-[22px] tracking-[-0.02em] text-[rgb(117,117,117)]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[rgb(18,18,18)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-[13px] bg-brand-surface px-1.5 py-0.5 rounded text-[rgb(18,18,18)] border border-brand-border/60">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    'strike-through': ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : '_self';
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-brand-text underline underline-offset-2 hover:opacity-70 transition-opacity font-medium"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    codeBlock: ({ value }: { value: { language?: string; code?: string; filename?: string } }) => {
      if (!value?.code) return null;
      return (
        <div className="my-3 rounded-[3px] border border-brand-border bg-[#18181b] text-[#f4f4f5] overflow-hidden text-[12px] font-mono">
          {(value.filename || value.language) && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#27272a] border-b border-[#3f3f46] text-[#a1a1aa] text-[11px]">
              <span className="font-medium truncate">{value.filename || `${(value.language || 'code').toUpperCase()}`}</span>
              {value.language && (
                <span className="uppercase text-[9px] tracking-wider px-1.5 py-0.5 rounded bg-[#3f3f46] text-[#e4e4e7]">
                  {value.language}
                </span>
              )}
            </div>
          )}
          <pre className="p-3 overflow-x-auto leading-relaxed">
            <code>{value.code}</code>
          </pre>
        </div>
      );
    },
  },
};

function SectionExplanation({ content }: { content: any }) {
  if (!content) return null;

  if (Array.isArray(content)) {
    return (
      <div className="portable-text-content pb-4">
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  }

  if (typeof content === 'string') {
    return (
      <p className="font-geist font-medium text-[15px] sm:text-[16px] leading-[22px] tracking-[-0.025em] text-[rgb(117,117,117)] pb-4 whitespace-pre-line">
        {content}
      </p>
    );
  }

  return null;
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
    return null;
  }

  // Only render if custom sections are explicitly populated in Sanity
  if (!project.sections || project.sections.length === 0) {
    return null;
  }

  const sections: ProjectSection[] = project.sections;

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
                    <SectionExplanation content={section.explanation} />
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
