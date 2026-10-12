import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../motion/FadeIn';
import { ParallaxImage } from '../motion/ParallaxImage';
import { useSanityProjects } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity';

export function WorkGrid() {
  const { projects, isLoading } = useSanityProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamically extract categories from projects with fallback defaults
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      if (p.category) {
        const trimmed = p.category.trim();
        if (trimmed) cats.add(trimmed);
      }
    });
    const unique = Array.from(cats);
    if (unique.length > 0) {
      return ['All', ...unique];
    }
    return ['All', 'Photography', 'Web design', 'Other'];
  }, [projects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(
      (p) => p.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    );
  }, [projects, selectedCategory]);

  if (isLoading) {
    return (
      <section className="min-h-screen">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start pt-20 lg:pt-24 pb-6 lg:pb-16 px-[15px] gap-6 lg:gap-0">
          <div className="h-12 w-48 bg-brand-surface animate-pulse rounded-[2px]" />
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-20 bg-brand-surface animate-pulse rounded-[2px]" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 lg:gap-y-2.5 px-[15px] pb-20">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full aspect-[1.29] bg-brand-surface animate-pulse rounded-[2px]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      {/* Header: Title and Categories (stacked on mobile, side-by-side sticky on desktop) */}
      <div className="relative lg:sticky lg:top-11 z-0 bg-brand-bg flex flex-col lg:flex-row lg:justify-between items-start pt-20 lg:pt-24 pb-6 lg:pb-16 px-[15px]">
        <FadeIn>
          <h1 className="font-geist font-medium text-[36px] sm:text-[46px] lg:text-[56px] leading-[1] lg:leading-[56px] tracking-[-0.05em] text-[#121212]">
            My Work.
          </h1>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-6 lg:mt-0">
          <div className="flex flex-col items-start gap-1.5 font-inter font-medium text-[14px] leading-[14px] tracking-tight">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`transition-opacity text-left cursor-pointer ${
                    isActive
                      ? 'text-[#121212] opacity-100'
                      : 'text-[#121212] opacity-50 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>
      </div>

      {/* Projects 2-Column Grid (overlaps sticky header on scroll only on desktop) */}
      <div className="relative z-0 lg:z-10 bg-brand-bg">
        {filteredProjects.length === 0 ? (
          <div className="px-[15px] py-20">
            <p className="font-geist font-medium text-[#333333] opacity-75 text-[14px]">
              No projects found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 lg:gap-y-2.5 px-[15px] pb-20">
            {filteredProjects.map((project, idx) => (
              <FadeIn key={project._id} delay={0.06 * (idx % 4)}>
                <Link to={`/work/${project.slug?.current || project._id}`} className="group cursor-pointer block">
                  <div className="overflow-hidden rounded-[2px] mb-1 bg-brand-surface">
                    {project.coverImage ? (
                      <ParallaxImage
                        src={urlFor(project.coverImage).width(1200).url()}
                        alt={project.title}
                        className="w-full aspect-[1.29]"
                        imageClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
                        parallaxAmount={20}
                      />
                    ) : (
                      <div className="w-full aspect-[1.29] bg-brand-surface flex items-center justify-center text-brand-muted text-[13px]">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Metadata: strictly 2 technologies + remainder */}
                  <div className="flex justify-between items-center px-1 font-geist font-medium text-[14px] leading-[20px]">
                    <h3 className="text-brand-text tracking-tight flex items-center min-w-0 pr-2">
                      <span className="shrink-0">{project.title}</span>
                      {project.technologies && project.technologies.length > 0 ? (
                        <>
                          <span className="text-[#333333] mx-2 text-[8px] leading-none opacity-75 shrink-0">◆</span>
                          <span className="text-[#333333] opacity-75 truncate">
                            {project.technologies.slice(0, 2).join(', ')}
                          </span>
                          {project.technologies.length > 2 && (
                            <span className="text-[#333333] opacity-75 shrink-0 whitespace-nowrap">
                              &nbsp;+{project.technologies.length - 2}
                            </span>
                          )}
                        </>
                      ) : project.category ? (
                        <>
                          <span className="text-[#333333] mx-2 text-[8px] leading-none opacity-75 shrink-0">◆</span>
                          <span className="text-[#333333] opacity-75 truncate">
                            {project.category}
                          </span>
                        </>
                      ) : null}
                    </h3>
                    <span className="text-[#333333] opacity-75 shrink-0 ml-1">
                      '{project.year?.toString().slice(-2) || '24'}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Mobile Footer */}
        <div className="flex lg:hidden flex-col items-center justify-center pt-12 pb-16 px-[15px] text-center font-geist font-medium text-[12px] leading-[18px]">
          <div className="text-brand-muted opacity-75">© 2026 All Rights Reserved</div>
        </div>
      </div>
    </section>
  );
}
