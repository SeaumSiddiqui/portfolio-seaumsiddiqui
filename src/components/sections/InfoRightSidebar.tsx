import React from 'react';
import { motion } from 'motion/react';
import { useSanityProfile } from '../../hooks/useSanity';
import type { StatItem, AchievementItem } from '../../types/sanity';

const DEFAULT_STATS: StatItem[] = [
  { value: '3+', label: 'Years of programming' },
  { value: '15+', label: 'Projects engineered' },
  { value: '500+', label: 'Problems solved' },
  { value: '99.9%', label: 'Target uptime' },
];

const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  { year: "'25", title: 'AWS Certified Solutions Architect', organization: 'Amazon Web Services' },
  { year: "'24", title: 'Oracle Certified Professional', organization: 'Oracle University' },
  { year: "'24", title: 'Top Performer in Competitive Programming', organization: 'University Contest' },
  { year: "'23", title: 'Dean’s Honor List', organization: 'Academic Excellence' },
];

export function InfoRightSidebar() {
  const { profile, isLoading } = useSanityProfile();

  // Resolve stats: profile.stats -> or build from experienceYears / defaults
  const stats: StatItem[] = profile?.stats?.length
    ? profile.stats
    : [
        {
          value: profile?.experienceYears ? `${profile.experienceYears}+` : '3+',
          label: 'Years of programming',
        },
        ...DEFAULT_STATS.slice(1),
      ];

  // Resolve achievements: profile.achievements -> or defaults matching reference
  const achievements: AchievementItem[] = profile?.achievements?.length
    ? profile.achievements
    : DEFAULT_ACHIEVEMENTS;

  if (isLoading) {
    return (
      <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar">
        {/* Stats Skeleton */}
        <div className="flex flex-col w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-1 border-b border-brand-border"
            >
              <div className="h-4 w-10 bg-brand-surface animate-pulse rounded-[2px]" />
              <div className="h-4 w-32 bg-brand-surface animate-pulse rounded-[2px]" />
            </div>
          ))}
        </div>

        {/* Achievements Skeleton */}
        <div className="flex flex-col w-full mt-auto pt-20 sm:pt-24 lg:pt-20">
          <div className="h-3 w-20 bg-brand-surface animate-pulse rounded-[2px] ml-auto mb-1" />
          <div className="flex flex-col w-full border-t border-brand-border">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-start py-2 first:pt-3.5 last:pb-0 border-b border-brand-border last:border-b-0"
              >
                <div className="h-3.5 w-6 bg-brand-surface animate-pulse rounded-[2px] mt-0.5" />
                <div className="flex flex-col items-end gap-1.5 pl-4">
                  <div className="h-4 w-36 bg-brand-surface animate-pulse rounded-[2px]" />
                  <div className="h-3 w-28 bg-brand-surface animate-pulse rounded-[2px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar">
      {/* Top: Key Stats / Metrics List */}
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

      {/* Bottom: Achievements / Awards List */}
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
    </aside>
  );
}
