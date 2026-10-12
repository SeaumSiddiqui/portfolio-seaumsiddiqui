import React from 'react';
import { motion } from 'motion/react';
import { RevealText } from '../motion/RevealText';
import { ParallaxImage } from '../motion/ParallaxImage';
import { useSanityProfile } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity';

export function InfoSidebar() {
  const { profile, isLoading } = useSanityProfile();

  // Dedicated Info page portrait from Sanity with Home page portrait as fallback
  const portraitUrl = profile?.infoImage
    ? urlFor(profile.infoImage).width(800).url()
    : profile?.profileImage
    ? urlFor(profile.profileImage).width(800).url()
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop';

  const currentYear = new Date().getFullYear();
  const currentYearShort = currentYear.toString().slice(-2);
  const startYear = profile?.sinceYear && profile.sinceYear < currentYear
    ? profile.sinceYear
    : (currentYear - 1);
  const copyrightText = `© ${startYear}-${currentYearShort}`;

  const email = profile?.email || 'seaumsiddiqui@outlook.com';
  const phone = profile?.phone || '(+880) 1706-020534';

  if (isLoading) {
    return (
      <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[15px] lg:pr-[30px] pt-[68px] lg:pt-24 pb-10 lg:pb-2">
        <div className="w-full shrink-0" style={{ containerType: 'inline-size' }}>
          <div className="h-14 w-3/4 bg-brand-surface animate-pulse rounded-[2px]" />
        </div>
        <div className="flex lg:block items-end justify-between w-full lg:w-[72%] lg:min-w-[220px] lg:max-w-[275px] mt-14 mb-0 lg:my-auto">
          <div className="w-[66.5%] sm:w-[69%] lg:w-full aspect-[3/4] lg:aspect-[4/5] bg-brand-surface animate-pulse rounded-[2px] shrink-0" />
          <div className="h-3 w-16 bg-brand-surface animate-pulse rounded-[2px] lg:mt-1.5 shrink-0 pl-3" />
        </div>
        <div className="flex justify-between items-end shrink-0 pt-4 lg:pt-0">
          <div className="flex flex-col gap-1">
            <div className="h-4 w-36 bg-brand-surface animate-pulse rounded-[2px]" />
            <div className="h-3.5 w-28 bg-brand-surface animate-pulse rounded-[2px]" />
          </div>
          <div className="flex gap-3">
            <div className="h-[18px] w-[18px] bg-brand-surface animate-pulse rounded-sm" />
            <div className="h-[18px] w-[18px] bg-brand-surface animate-pulse rounded-sm" />
            <div className="h-[18px] w-[18px] bg-brand-surface animate-pulse rounded-sm" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[15px] lg:pr-[30px] pt-[68px] lg:pt-24 pb-10 lg:pb-2">
      {/* Top: Title with exact typography and spacing matching Home page Hello! */}
      <div className="w-full shrink-0" style={{ containerType: 'inline-size' }}>
        <h1 className="font-geist font-medium text-[clamp(24px,12cqw,56px)] leading-[1] tracking-[-0.06em] text-brand-text whitespace-nowrap">
          <RevealText text="About Me." delay={0.1} />
        </h1>
      </div>

      {/* Middle: Author Portrait Image Card & Copyright Label */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 mb-0 lg:my-auto"
      >
        <div className="flex lg:block items-end justify-between w-full lg:w-[72%] lg:min-w-[220px] lg:max-w-[275px]">
          <div className="w-[66.5%] sm:w-[69%] lg:w-full overflow-hidden rounded-[2px] bg-brand-surface shrink-0">
            <ParallaxImage
              src={portraitUrl}
              alt="Author Portrait"
              className="w-full aspect-[3/4] lg:aspect-[4/5]"
              imageClassName="transition-transform duration-700 ease-out"
              parallaxAmount={8}
            />
          </div>
          <div className="text-right font-geist font-medium text-[12px] lg:text-[14px] leading-[17px] lg:leading-[20px] text-[rgb(117,117,117)] lg:mt-1.5 shrink-0 pl-3">
            {copyrightText}
          </div>
        </div>
      </motion.div>

      {/* Bottom: Contact Details & Social Icons (reusing Home page icons) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full shrink-0 pt-4 lg:pt-0"
      >
        <div className="flex justify-between items-end pb-0">
          {/* Email and Phone with matching font tokens */}
          <div className="flex flex-col gap-1">
            <a
              href={`mailto:${email}`}
              className="font-inter font-semibold text-[16px] leading-[16px] text-[#333333] hover:opacity-75 transition-opacity"
            >
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="font-inter font-semibold text-[14px] leading-[14px] text-[#333333] hover:opacity-75 transition-opacity"
            >
              {phone}
            </a>
          </div>

          {/* Social Media Icons (Exact icons from Home page Sidebar) */}
          <div className="flex items-center gap-3 text-brand-text">
            {/* LinkedIn */}
            <a
              href={profile?.linkedinUrl || '#'}
              target={profile?.linkedinUrl ? '_blank' : '_self'}
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-50 transition-opacity w-[18px] h-[18px] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={profile?.githubUrl || '#'}
              target={profile?.githubUrl ? '_blank' : '_self'}
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:opacity-50 transition-opacity w-[18px] h-[18px] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            {/* LeetCode */}
            <a
              href={profile?.leetcodeUrl || '#'}
              target={profile?.leetcodeUrl ? '_blank' : '_self'}
              rel="noreferrer"
              aria-label="LeetCode"
              className="hover:opacity-50 transition-opacity w-[18px] h-[18px] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
