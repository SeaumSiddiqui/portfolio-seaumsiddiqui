import React from 'react';
import { motion } from 'motion/react';
import { useSanityProfile } from '../../hooks/useSanity';

export function InfoRightSidebar() {
  const { profile, isLoading } = useSanityProfile();

  // Strictly use what is provided in Sanity - NO fake default achievements or stats
  const stats = profile?.stats?.length ? profile.stats : null;
  const achievements = profile?.achievements?.length ? profile.achievements : null;

  if (isLoading) {
    return (
      <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar">
        <div className="flex flex-col w-full">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-brand-border">
              <div className="h-4 w-10 bg-brand-surface animate-pulse rounded-[2px]" />
              <div className="h-4 w-32 bg-brand-surface animate-pulse rounded-[2px]" />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  // If user hasn't added stats or achievements yet, render a clean location & status card
  if (!stats && !achievements) {
    return (
      <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col"
        >
          <div className="flex items-center gap-1.5 pb-3 border-b border-brand-border">
            <span className="text-[10px] text-brand-muted shrink-0 leading-none opacity-75">◆</span>
            <span className="font-geist font-medium text-[14px] leading-[20px] tracking-tight text-brand-text">
              Status & Presence
            </span>
          </div>
          <div className="flex flex-col gap-1.5 mt-4 text-[14px] font-geist font-medium text-brand-text">
            <div>Based in {profile?.location || 'Dhaka, Bangladesh'}</div>
            <div className="text-brand-muted opacity-75">
              Available for full-time & contract opportunities
            </div>
          </div>
        </motion.div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar">
      {/* Top: Key Stats / Metrics List (only rendered if entered in Sanity) */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col"
        >
          <div className="flex flex-col w-full">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex justify-between items-baseline py-1 border-b border-brand-border"
              >
                <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)]">
                  {stat.value}
                </span>
                <span className="text-right font-geist font-medium text-[16px] leading-[22px] text-[rgb(18,18,18)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bottom: Achievements / Awards List (only rendered if entered in Sanity) */}
      {achievements && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col mt-auto pt-20 sm:pt-24 lg:pt-20 pb-0"
        >
          <div className="text-right font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] mb-1">
            Achievements
          </div>
          <div className="flex flex-col w-full border-t border-brand-border">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start py-2 first:pt-3.5 last:pb-0 border-b border-brand-border last:border-b-0"
              >
                <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] shrink-0 pt-0.5">
                  {item.year}
                </span>
                <div className="flex flex-col items-end text-right pl-4">
                  <span className="font-geist font-medium text-[16px] leading-[22px] text-[rgb(18,18,18)]">
                    {item.title}
                  </span>
                  <span className="font-geist font-medium text-[14px] leading-[20px] text-[rgb(117,117,117)] mt-0.5">
                    {item.organization}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </aside>
  );
}
