import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../motion/FadeIn';
import { ParallaxImage } from '../motion/ParallaxImage';
import { useSanityProjects } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity';

import { Hero } from './Hero';

export function ProjectGrid() {
  const { projects, isLoading } = useSanityProjects();

  // Only display projects marked as selectedWork on Home page (fallback to all if none marked yet)
  const selectedProjects = React.useMemo(() => {
    const explicitlySelected = projects.filter((p) => p.selectedWork === true);
    return explicitlySelected.length > 0 ? explicitlySelected : projects;
  }, [projects]);

  if (isLoading) {
    return (
      <section className="px-[15px] py-20">
        <div className="animate-pulse flex flex-col gap-16 lg:gap-24">
           {[1, 2, 3].map(i => (
             <div key={i} className="w-full aspect-[1.35] bg-brand-surface rounded-[2px]"></div>
           ))}
        </div>
      </section>
    );
  }

  if (selectedProjects.length === 0) {
     return (
       <section className="px-[15px] py-20">
         <p className="font-geist font-medium text-brand-muted text-[14px]">No selected work found. Please mark projects as Selected Work in Sanity Studio.</p>
       </section>
     );
  }

  return (
    <section className="relative">
      {/* Top Header & Hero (sticky only on desktop, normal single-page flow on mobile) */}
      <div className="relative lg:sticky lg:top-11 z-0 bg-brand-bg pb-0 lg:pb-[7px]">
        <Hero />
        <div className="px-[15px] mt-8 lg:mt-72">
          <FadeIn>
            <div className="flex justify-between items-end">
              <span className="font-geist font-medium text-[18px] leading-[25px] text-brand-text">Selected work</span>
              <span className="font-geist font-medium text-[12px] leading-[17px] text-[rgb(117,117,117)]">
                ({selectedProjects.length.toString().padStart(2, '0')})
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
      
      {/* Work Grid Thumbnails (normal flow on mobile, overlaps on desktop scroll) */}
      <div className="flex flex-col gap-3 lg:gap-4 relative z-0 lg:z-10 bg-brand-bg px-[15px] mt-3 lg:mt-0 pb-20">
        {selectedProjects.map((project) => (
          <FadeIn key={project._id} delay={0.1}>
            <Link
              to={`/work/${project.slug?.current || project._id}`}
              className="group cursor-pointer block"
            >
              <div className="overflow-hidden rounded-[2px] mb-1 bg-brand-surface">
                {project.coverImage && (
                  <ParallaxImage 
                    src={urlFor(project.coverImage).width(1600).url()} 
                    alt={project.title}
                    className="w-full aspect-[1.35]"
                    imageClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
                    parallaxAmount={25}
                  />
                )}
              </div>
              <div className="flex justify-between items-center px-1 font-geist font-medium text-[14px] leading-[20px]">
                <h3 className="text-brand-text tracking-tight flex items-center">
                  {project.title}
                  {project.technologies && project.technologies.length > 0 && (
                    <>
                      <span className="text-[#333333] mx-2 text-[8px] leading-none opacity-75">◆</span>
                      <span className="hidden lg:inline text-[#333333] opacity-75">
                        {project.technologies.slice(0, 5).join(', ')}
                        {project.technologies.length > 5 && ` +${project.technologies.length - 5}`}
                      </span>
                      <span className="lg:hidden text-[#333333] opacity-75">
                        {project.technologies.slice(0, 2).join(', ')}
                        {project.technologies.length > 2 && ` +${project.technologies.length - 2}`}
                      </span>
                    </>
                  )}
                </h3>
                <span className="text-[#333333] opacity-75">
                  '{project.year?.toString().slice(-2) || '24'}
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
      
      {/* Mobile Footer */}
      <div className="flex lg:hidden flex-col items-center justify-center pt-12 pb-16 px-[15px] text-center font-geist font-medium text-[12px] leading-[18px]">
        <div className="text-brand-muted opacity-75">© 2025 All Rights Reserved</div>
      </div>
    </section>
  );
}
