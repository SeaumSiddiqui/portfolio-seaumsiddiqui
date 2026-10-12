import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types/sanity';

interface ProjectDetailNavProps {
  prevProject: Project | null;
  nextProject: Project | null;
  className?: string;
}

export function ProjectDetailNav({
  prevProject,
  nextProject,
  className = '',
}: ProjectDetailNavProps) {
  return (
    <div className={`flex justify-between items-end font-geist select-none ${className}`}>
      {prevProject ? (
        <Link
          to={`/work/${prevProject.slug.current}`}
          className="group flex flex-col gap-1 text-left transition-opacity hover:opacity-75 max-w-[48%]"
        >
          <span className="font-inter font-semibold text-[16px] leading-[16px] text-[rgb(18,18,18)]">
            Previous project
          </span>
          <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] truncate transition-colors group-hover:text-brand-text">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <div className="flex flex-col gap-1 text-left opacity-30">
          <span className="font-inter font-semibold text-[16px] leading-[16px] text-[rgb(18,18,18)]">
            Previous project
          </span>
          <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)]">
            —
          </span>
        </div>
      )}

      {nextProject ? (
        <Link
          to={`/work/${nextProject.slug.current}`}
          className="group flex flex-col gap-1 text-right transition-opacity hover:opacity-75 max-w-[48%] ml-auto items-end"
        >
          <span className="font-inter font-semibold text-[16px] leading-[16px] text-[rgb(18,18,18)]">
            Next project
          </span>
          <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] truncate transition-colors group-hover:text-brand-text">
            {nextProject.title}
          </span>
        </Link>
      ) : (
        <div className="flex flex-col gap-1 text-right opacity-30 ml-auto items-end">
          <span className="font-inter font-semibold text-[16px] leading-[16px] text-[rgb(18,18,18)]">
            Next project
          </span>
          <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)]">
            —
          </span>
        </div>
      )}
    </div>
  );
}
