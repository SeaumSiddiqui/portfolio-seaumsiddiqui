import React from 'react';
import { useParams } from 'react-router-dom';
import { useSanityProject, useSanityProjects } from '../../hooks/useSanity';
import { ProjectDetailSidebar } from './ProjectDetailSidebar';
import { ProjectDetailCenter } from './ProjectDetailCenter';
import { ProjectDetailRightSidebar } from './ProjectDetailRightSidebar';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { project, isLoading } = useSanityProject(slug);
  const { projects } = useSanityProjects();

  // Determine previous and next project in cycle with case-insensitive matching
  const currentSlug = slug?.toLowerCase();
  const currentIndex = projects.findIndex(
    (p) => p.slug?.current?.toLowerCase() === currentSlug
  );

  const prevProject =
    projects.length > 1
      ? currentIndex > 0
        ? projects[currentIndex - 1]
        : projects[projects.length - 1]
      : null;

  const nextProject =
    projects.length > 1
      ? currentIndex >= 0 && currentIndex < projects.length - 1
        ? projects[currentIndex + 1]
        : projects[0]
      : null;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.65fr_1fr] pt-11 min-h-screen">
      {/* Left Column (Project Detail Left Sidebar) */}
      <div className="order-1 lg:order-1 lg:border-r border-brand-border min-w-0">
        <ProjectDetailSidebar project={project} isLoading={isLoading} />
      </div>

      {/* Center Column (Scrollable Project Overview, Live website bar, and Showcase Gallery) */}
      <div className="order-2 lg:order-2 lg:border-r border-brand-border flex flex-col min-w-0 min-h-screen">
        <ProjectDetailCenter
          project={project}
          isLoading={isLoading}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </div>

      {/* Right Column (Project Detail Right Sidebar - Collapsible Sections + Prev/Next Navigation) */}
      <div className="order-3 lg:order-3 min-w-0">
        <ProjectDetailRightSidebar
          project={project}
          isLoading={isLoading}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </div>
    </div>
  );
}
