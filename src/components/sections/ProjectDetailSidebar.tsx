import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from '../motion/FadeIn';
import { ParallaxImage } from '../motion/ParallaxImage';
import { urlFor } from '../../lib/sanity';
import type { Project } from '../../types/sanity';

interface ProjectDetailSidebarProps {
  project: Project | null;
  isLoading: boolean;
}

export function ProjectDetailSidebar({ project, isLoading }: ProjectDetailSidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  if (isLoading || !project) {
    return (
      <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[15px] lg:pr-[30px] pt-20 lg:pt-24 pb-0 lg:pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
        <div className="h-16 w-3/4 bg-brand-surface animate-pulse rounded-[2px]" />
        <div className="w-full lg:w-[80%] lg:min-w-[220px] lg:max-w-[290px] mt-16 mb-2 lg:my-auto">
          <div className="block lg:hidden h-4 w-24 bg-brand-surface animate-pulse rounded-[2px] mb-2" />
          <div className="w-full aspect-[1.28] lg:aspect-[1.35] bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="hidden lg:block h-4 w-24 bg-brand-surface animate-pulse rounded-[2px] mt-1.5 ml-auto" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-6 w-full bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="h-6 w-full bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="h-6 w-full bg-brand-surface animate-pulse rounded-[2px]" />
        </div>
      </aside>
    );
  }

  const yearFormatted = project.year ? `'${project.year.toString().slice(-2)}` : "'24";
  const clientText = project.client || project.title;
  const technologiesText = project.technologies?.length ? project.technologies.join(', ') : 'React, TypeScript';

  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[15px] lg:pr-[30px] pt-20 lg:pt-24 pb-0 lg:pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
      {/* Top: Project Title */}
      <FadeIn delay={0.1}>
        <h1 className="font-geist font-medium text-[40px] sm:text-[48px] lg:text-[56px] leading-[1] tracking-[-0.07em] text-brand-text">
          {project.title}
        </h1>
      </FadeIn>

      {/* Middle: Thumbnail Preview & Category Label (top-left on mobile, bottom-right on desktop) */}
      <FadeIn delay={0.2} className="mt-16 mb-2 lg:my-auto">
        <div className="w-full lg:w-[80%] lg:min-w-[220px] lg:max-w-[290px]">
          {/* Mobile-only: Category on top-left of thumbnail */}
          {project.category && (
            <div className="block lg:hidden text-left font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] mb-2">
              {project.category}
            </div>
          )}

          <div className="overflow-hidden rounded-[2px] bg-brand-surface">
            {project.coverImage ? (
              <ParallaxImage
                src={urlFor(project.coverImage).width(600).url()}
                alt={project.title}
                className="w-full aspect-[1.28] lg:aspect-[1.35]"
                imageClassName="transition-transform duration-700 ease-out"
                parallaxAmount={10}
              />
            ) : (
              <div className="w-full aspect-[1.28] lg:aspect-[1.35] bg-brand-surface flex items-center justify-center text-brand-muted text-[13px]">
                No image
              </div>
            )}
          </div>

          {/* Desktop-only: Category underneath thumbnail on bottom-right */}
          {project.category && (
            <div className="hidden lg:block text-right font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] mt-1.5">
              {project.category}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Bottom: Metadata Table (Technologies, Year, Client) - no border-t on mobile, border-t on desktop */}
      <FadeIn delay={0.3} className="w-full shrink-0">
        <div className="relative lg:border-t border-brand-border py-2 flex justify-between items-center font-geist font-medium text-[13px] lg:text-[14px] leading-[20px]">
          <span className="text-[#333333] opacity-75 shrink-0">Technologies</span>
          
          <div
            className="relative ml-4 min-w-0 max-w-[70%] text-right group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
            title={technologiesText}
          >
            <span className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(18,18,18)] truncate block group-hover:opacity-75 transition-opacity">
              {technologiesText}
            </span>

            {/* Minimal floating tooltip holding all technologies */}
            <AnimatePresence>
              {isHovered && project.technologies && project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute bottom-full right-0 mb-2.5 z-50 pointer-events-auto"
                >
                  <div className="bg-[#18181b] text-white p-3 rounded-[6px] shadow-2xl border border-[#27272a] w-max max-w-[280px] sm:max-w-[320px] text-left">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#27272a] text-[10px] uppercase font-mono tracking-wider text-[#a1a1aa]">
                      <span>All Technologies</span>
                      <span className="text-[#71717a]">({project.technologies.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-[3px] bg-[#27272a] text-[#f4f4f5] font-geist font-medium text-[12px] leading-[16px] border border-[#3f3f46]/60 whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Tooltip Downward Caret Arrow */}
                  <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#18181b] border-r border-b border-[#27272a] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-brand-border py-2 flex justify-between items-center font-geist font-medium text-[13px] lg:text-[14px] leading-[20px]">
          <span className="text-[#333333] opacity-75 shrink-0">Year</span>
          <span className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(18,18,18)]">
            {yearFormatted}
          </span>
        </div>

        <div className="border-t border-brand-border pt-2 pb-0 flex justify-between items-center font-geist font-medium text-[13px] lg:text-[14px] leading-[20px]">
          <span className="text-[#333333] opacity-75 shrink-0">Client</span>
          <span className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(18,18,18)] truncate ml-4 text-right">
            {clientText}
          </span>
        </div>
      </FadeIn>
    </aside>
  );
}
