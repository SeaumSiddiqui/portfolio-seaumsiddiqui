import React from 'react';
import { FadeIn } from '../motion/FadeIn';
import { ParallaxImage } from '../motion/ParallaxImage';
import { ProjectDetailSections } from './ProjectDetailSections';
import { ProjectDetailNav } from './ProjectDetailNav';
import { urlFor } from '../../lib/sanity';
import type { Project } from '../../types/sanity';

interface ProjectDetailCenterProps {
  project: Project | null;
  isLoading: boolean;
  prevProject?: Project | null;
  nextProject?: Project | null;
}

export function ProjectDetailCenter({
  project,
  isLoading,
  prevProject,
  nextProject,
}: ProjectDetailCenterProps) {
  if (isLoading || !project) {
    return (
      <section className="relative w-full">
        {/* Mobile-only Sections & Nav Skeleton */}
        <div className="block lg:hidden px-[15px] pt-[70px]">
          <div className="h-5 w-1/3 bg-brand-surface animate-pulse rounded-[2px] mb-3" />
          <div className="h-14 w-full bg-brand-surface animate-pulse rounded-[2px] mb-4" />
          <div className="h-px w-full bg-brand-border my-2" />
          <div className="h-5 w-1/3 bg-brand-surface animate-pulse rounded-[2px] mb-3" />
          <div className="h-14 w-full bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="pt-20 flex justify-between items-end">
            <div className="h-4 w-24 bg-brand-surface animate-pulse rounded-[2px]" />
            <div className="h-4 w-20 bg-brand-surface animate-pulse rounded-[2px]" />
          </div>
        </div>

        {/* Top Section Skeleton (sticky on desktop only) */}
        <div className="relative lg:sticky lg:top-11 z-0 bg-brand-bg pb-0 lg:pb-[7px]">
          {/* Top Overview Paragraph Skeleton */}
          <div className="px-[15px] pt-20 lg:pt-24 pb-0 lg:pb-8">
            <div className="h-6 w-full max-w-[85%] bg-brand-surface animate-pulse rounded-[2px] mb-2" />
            <div className="h-6 w-3/4 bg-brand-surface animate-pulse rounded-[2px] mb-2" />
            <div className="h-6 w-1/2 bg-brand-surface animate-pulse rounded-[2px]" />
          </div>

          {/* Live project bar Skeleton */}
          <div className="px-[15px] mt-20 lg:mt-[272px]">
            <div className="flex justify-between items-end">
              <div className="h-4 w-24 bg-brand-surface animate-pulse rounded-[2px]" />
              <div className="h-3 w-20 bg-brand-surface animate-pulse rounded-[2px]" />
            </div>
          </div>
        </div>

        {/* Showcase Images Skeleton (normal flow on mobile, overlaps on desktop) */}
        <div className="flex flex-col gap-[15px] lg:gap-4 relative z-0 lg:z-10 bg-brand-bg px-[15px] mt-2 lg:mt-0 pb-20 w-full">
          <div className="w-full aspect-[1.35] bg-brand-surface rounded-[2px] animate-pulse" />
          <div className="w-full aspect-[1.35] bg-brand-surface rounded-[2px] animate-pulse" />
          <div className="w-full aspect-[1.35] bg-brand-surface rounded-[2px] animate-pulse" />
        </div>

        {/* Mobile Footer Skeleton */}
        <div className="flex lg:hidden flex-col items-center justify-center pt-16 pb-16 px-[15px]">
          <div className="h-3 w-36 bg-brand-surface animate-pulse rounded-[2px]" />
        </div>
      </section>
    );
  }

  // 1. Overview paragraph text from Sanity
  const overviewText = project.description || (
    project.technologies && project.technologies.length > 0
      ? `${project.title} — Engineered with ${project.technologies.slice(0, 4).join(', ')}.`
      : `${project.title} is a digital project by Seaum Siddiqui.`
  );

  const clientCopyright = project.client || project.title;

  // 2. Link target and label: priority to liveUrl ('Live website'), then githubUrl ('GitHub Repository')
  const linkUrl = project.liveUrl || project.githubUrl;
  const linkLabel = project.liveUrl
    ? 'Live website'
    : project.githubUrl
    ? 'GitHub Repository'
    : 'Live website';

  // 3. Showcase gallery images: strictly what user uploaded to project.gallery or project.coverImage
  const images: string[] = React.useMemo(() => {
    const list: string[] = [];
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.forEach((img) => {
        try {
          list.push(urlFor(img).width(2000).quality(90).url());
        } catch {}
      });
    } else if (project.coverImage) {
      try {
        list.push(urlFor(project.coverImage).width(2000).quality(90).url());
      } catch {}
    }
    return list;
  }, [project]);

  return (
    <section className="relative w-full">
      {/* Mobile-only Sections & Navigation (placed above Project Overview / Summary on phone, reflecting reference layout spacing) */}
      <div className="block lg:hidden px-[15px] pt-[70px]">
        <ProjectDetailSections project={project} isLoading={isLoading} />
        <div className="pt-20">
          <ProjectDetailNav prevProject={prevProject || null} nextProject={nextProject || null} />
        </div>
      </div>

      {/* Top Section: Overview Paragraph + Live website Bar (sticky on desktop only, normal flow on mobile) */}
      <div className="relative lg:sticky lg:top-11 z-0 bg-brand-bg pb-0 lg:pb-[7px]">
        {/* 1. Top Project Overview Paragraph */}
        <div className="px-[15px] pt-20 lg:pt-24 pb-0 lg:pb-8">
          <FadeIn delay={0.2}>
            <p className="font-geist font-medium text-[16px] leading-[22px] lg:text-[26px] lg:leading-[29px] tracking-tight lg:tracking-tighter max-w-full lg:max-w-[85%] text-brand-text">
              {overviewText}
            </p>
          </FadeIn>
        </div>

        {/* 2. Live website / GitHub Repository Header Bar */}
        <div className="px-[15px] mt-20 lg:mt-[272px]">
          <FadeIn delay={0.3}>
            <div className="flex justify-between items-end">
              {linkUrl ? (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-inter font-semibold text-[16px] leading-[16px] text-[rgb(18,18,18)] hover:text-[rgb(117,117,117)] transition-colors"
                >
                  {linkLabel}
                </a>
              ) : (
                <span className="font-inter font-semibold text-[16px] leading-[16px] text-[rgb(18,18,18)]">
                  {linkLabel}
                </span>
              )}
              <span className="font-geist font-medium text-[12px] leading-[17px] text-[rgb(117,117,117)]">
                © {clientCopyright}
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 3. Showcase Images Stack (normal flow on mobile, overlaps sticky header on desktop) */}
      <div className="flex flex-col gap-[15px] lg:gap-4 relative z-0 lg:z-10 bg-brand-bg px-[15px] mt-2 lg:mt-0 pb-6 lg:pb-20 w-full">
        {images.map((src, idx) => (
          <FadeIn key={idx} delay={0.15 + idx * 0.1}>
            <div className="overflow-hidden rounded-[2px] bg-brand-surface">
              <ParallaxImage
                src={src}
                alt={`${project.title} showcase ${idx + 1}`}
                className="w-full aspect-[1.35]"
                imageClassName="transition-transform duration-700 ease-out"
                parallaxAmount={25}
              />
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Mobile Footer matching Home screen */}
      <div className="flex lg:hidden flex-col items-center justify-center pt-16 pb-16 px-[15px] text-center font-geist font-medium text-[12px] leading-[18px]">
        <div className="text-brand-muted opacity-75">© 2025 All Rights Reserved</div>
      </div>
    </section>
  );
}
