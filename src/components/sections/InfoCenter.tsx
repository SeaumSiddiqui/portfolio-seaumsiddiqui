import React from 'react';
import { motion } from 'motion/react';
import { useSanityProfile } from '../../hooks/useSanity';
import { recordResumeClick } from '../../lib/telemetry';
import type { SoftwareStackItem, ExperienceItem } from '../../types/sanity';

function SoftwareIcon({ name }: { name: string }) {
  const n = name.toLowerCase();

  if (n.includes('framer')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    );
  }

  if (n.includes('figma')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="currentColor" opacity="0.9" />
        <path d="M0 47.5A9.5 9.5 0 0 0 9.5 57 9.5 9.5 0 0 0 19 47.5V38H9.5A9.5 9.5 0 0 0 0 47.5z" fill="currentColor" opacity="0.75" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19z" fill="currentColor" opacity="0.9" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="currentColor" opacity="0.75" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="currentColor" opacity="0.85" />
      </svg>
    );
  }

  if (n.includes('photoshop')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  if (n.includes('illustrator')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="m9 15 3-7 3 7M10 13h4" />
      </svg>
    );
  }

  if (n.includes('javascript') || n.includes('js')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18a4 4 0 0 0 4-4V6" />
        <path d="M8 6a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4" />
      </svg>
    );
  }

  if (n.includes('spline')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    );
  }

  // Fallback generic code/tool icon
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function InfoCenter() {
  const { profile, isLoading } = useSanityProfile();

  // Resolve Headline Bio: Custom from Sanity or default profile fallback
  const bioHeadline =
    profile?.infoBioHeadline ||
    (profile?.bio
      ? `${profile.bio}${profile.bioMuted ? ' ' + profile.bioMuted : ''}`
      : "I'm Seaum Siddiqui — a backend engineer and Computer Science student based in Dhaka, Bangladesh, focused on building secure, high-performing systems.");

  // Resolve Body Bio: Custom from Sanity
  const bioBody = profile?.infoBioBody || null;

  // Resolve Software Stack: strictly what is entered in Sanity
  const softwareStack: SoftwareStackItem[] = profile?.softwareStack?.length
    ? profile.softwareStack
    : [];

  // Resolve Experience: strictly what is entered in Sanity (NO fake entries)
  const experiences: ExperienceItem[] = profile?.experience?.length
    ? profile.experience
    : [];

  if (isLoading) {
    return (
      <div className="w-full flex flex-col px-[15px] pt-12 lg:pt-24 pb-16 lg:pb-24">
        <div className="h-20 bg-brand-surface animate-pulse rounded-[2px] w-full" />
        <div className="h-14 bg-brand-surface animate-pulse rounded-[2px] w-4/5 mt-4" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-[15px] pt-12 lg:pt-24 pb-16 lg:pb-24">
      {/* 1. Bio Paragraphs & Resume Action */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col"
      >
        <p className="font-geist font-medium text-[20px] lg:text-[26px] leading-[26px] lg:leading-[29px] tracking-[-0.03em] text-[rgb(18,18,18)]">
          {bioHeadline}
        </p>
        {bioBody && (
          <p className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(117,117,117)] mt-4">
            {bioBody}
          </p>
        )}

        {/* If Resume is uploaded, provide a direct download link */}
        {profile?.resumeUrl && (
          <div className="mt-8 pt-4 border-t border-brand-border">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordResumeClick('info')}
              className="inline-flex items-center gap-2 font-inter font-semibold text-[14px] text-brand-text hover:opacity-70 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        )}
      </motion.div>

      {/* 2. Software Stack (Only rendered if user configured items in Sanity) */}
      {softwareStack.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-24 flex flex-col w-full"
        >
          <h2 className="font-geist font-medium text-[20px] lg:text-[26px] leading-[26px] lg:leading-[29px] tracking-[-0.03em] text-[rgb(18,18,18)] mb-4 sm:mb-5">
            Software Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {softwareStack.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-[4px] border border-brand-border bg-white transition-colors hover:border-brand-text/30"
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="font-geist font-medium text-[18px] leading-[25px] text-[rgb(18,18,18)]">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] mt-0.5 truncate">
                      {item.description}
                    </span>
                  )}
                </div>
                <div className="w-5 h-5 flex items-center justify-center text-[rgb(117,117,117)] shrink-0 ml-2">
                  <SoftwareIcon name={item.icon || item.name} />
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* 3. Experience (Only rendered if user configured experience in Sanity) */}
      {experiences.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-24 flex flex-col w-full"
        >
          <div className="flex justify-between items-baseline mb-3">
            <h2 className="font-geist font-medium text-[20px] lg:text-[26px] leading-[26px] lg:leading-[29px] tracking-[-0.03em] text-[rgb(18,18,18)]">
              Experience
            </h2>
          </div>

          <div className="flex flex-col w-full border-t border-brand-border">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-6 py-3.5 sm:py-4 border-b border-brand-border"
              >
                <div className="flex flex-col">
                  <span className="font-geist font-medium text-[18px] leading-[25px] text-[rgb(18,18,18)]">
                    {exp.role}
                  </span>
                  <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] mt-0.5">
                    {exp.company}
                  </span>
                  <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)]">
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-col justify-start">
                  <p className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(117,117,117)]">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
