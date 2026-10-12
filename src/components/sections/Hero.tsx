import React from 'react';
import { FadeIn } from '../motion/FadeIn';
import { useSanityProfile } from '../../hooks/useSanity';

export function Hero() {
  const { profile, isLoading } = useSanityProfile();

  const bio = profile?.bio || "A backend engineer and final-year Comp Sci student — specializing in Java and Spring Boot, focused on building secure, high-performing backend systems.";

  // If bioMuted is provided from Sanity, use it! Otherwise fallback to the old split logic.
  let firstPart = bio;
  let secondPart = profile?.bioMuted || '';
  
  if (!profile?.bioMuted) {
    const separator = bio.includes('—') ? '—' : bio.includes('-') ? '-' : null;
    if (separator) {
      const parts = bio.split(separator);
      firstPart = parts[0] + separator;
      secondPart = parts.slice(1).join(separator);
    }
  }

  return (
    <section className="px-[15px] pt-12 lg:pt-24 pb-8">
      <FadeIn delay={0.3}>
        {isLoading ? (
          <div className="h-24 bg-brand-surface animate-pulse w-full rounded-[2px]"></div>
        ) : (
          <p className="font-geist font-medium text-[16px] leading-[22px] lg:text-[26px] lg:leading-[29px] tracking-tight lg:tracking-tighter max-w-full lg:max-w-[85%]">
            <span className="text-brand-text">{firstPart}</span>
            {secondPart && <span className="opacity-40">{secondPart}</span>}
          </p>
        )}
      </FadeIn>
    </section>
  );
}
