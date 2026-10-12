import React from 'react';
import { FadeIn } from '../motion/FadeIn';
import { ProjectDetailSections } from './ProjectDetailSections';
import { ProjectDetailNav } from './ProjectDetailNav';
import type { Project } from '../../types/sanity';

interface ProjectDetailRightSidebarProps {
  project: Project | null;
  isLoading: boolean;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectDetailRightSidebar({
  project,
  isLoading,
  prevProject,
  nextProject,
}: ProjectDetailRightSidebarProps) {
  if (isLoading || !project) {
    return (
      <aside className="hidden lg:flex lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
        <div className="flex flex-col gap-4">
          <div className="h-5 w-1/3 bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="h-14 w-full bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="h-px w-full bg-brand-border my-2" />
          <div className="h-5 w-1/3 bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="h-14 w-full bg-brand-surface animate-pulse rounded-[2px]" />
        </div>
        <div className="pt-8 lg:pt-2 pb-0 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 bg-brand-surface animate-pulse rounded-[2px]" />
            <div className="h-3 w-16 bg-brand-surface animate-pulse rounded-[2px]" />
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="h-4 w-20 bg-brand-surface animate-pulse rounded-[2px]" />
            <div className="h-3 w-16 bg-brand-surface animate-pulse rounded-[2px]" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
      {/* Top: Collapsible Custom Sections on desktop */}
      <ProjectDetailSections
        project={project}
        isLoading={isLoading}
      />

      {/* Bottom: Previous & Next Project Navigation on desktop */}
      <FadeIn delay={0.4} className="mt-auto shrink-0 w-full pt-8">
        <ProjectDetailNav prevProject={prevProject} nextProject={nextProject} />
      </FadeIn>
    </aside>
  );
}
