import React from 'react';
import { FadeIn } from '../motion/FadeIn';
import { ParallaxImage } from '../motion/ParallaxImage';
import { useSanityProfile } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity';

export function RightSidebar() {
  const { profile, isLoading } = useSanityProfile();

  const portraitUrl = profile?.profileImage 
    ? urlFor(profile.profileImage).width(600).url() 
    : null;
    
  const roles = profile?.roles?.length ? profile.roles : ["Backend Engineer"];
  const location = profile?.location || "Dhaka, Bangladesh";
  const sinceYear = profile?.sinceYear || 2026;

  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-12 lg:pt-24 pb-12 lg:pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
      <FadeIn delay={0.4} className="w-full">
        <div className="w-full flex justify-between items-start gap-2" style={{ containerType: 'inline-size' }}>
          {/* Left Side: Available for work */}
          <div className="flex items-center gap-1.5 mt-1 shrink-0">
             <span className="text-[10px] text-brand-muted shrink-0 leading-none opacity-75">◆</span>
             <span className="font-geist font-medium text-[14px] leading-[20px] tracking-tight text-brand-text whitespace-nowrap">Available for work</span>
          </div>
          
          {/* Right Side: Portrait or Minimalist Monogram and Bio List */}
          <div className="w-[clamp(120px,55cqw,240px)] flex flex-col ml-auto">
            {!isLoading && (
              portraitUrl ? (
                <ParallaxImage 
                  src={portraitUrl} 
                  alt="Seaum Siddiqui"
                  className="w-full aspect-[4/5] object-cover rounded-[2px]"
                  parallaxAmount={5}
                />
              ) : (
                <div className="w-full aspect-[4/5] bg-brand-surface rounded-[2px] border border-brand-border flex flex-col items-center justify-center select-none">
                  <span className="font-geist font-medium text-[28px] tracking-tighter text-brand-text">SS</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-brand-muted mt-1 opacity-75">
                    Seaum Siddiqui
                  </span>
                </div>
              )
            )}
            <div className="text-right mt-8 font-geist font-medium text-[14px] leading-[20px] flex flex-col gap-[2px] items-end">
              {roles.map((r, i) => (
                <div key={i} className="text-brand-text">{r}</div>
              ))}
              <div className="text-brand-text">Based in {location}</div>
              <div className="text-brand-muted opacity-75">Since {sinceYear}</div>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.5} className="flex justify-between items-end mt-auto shrink-0 pt-10">
        <div className="flex flex-col gap-1">
          <span className="font-inter font-semibold text-[16px] leading-[16px] text-[#333333]">{profile?.email || 'seaumsiddiqui@outlook.com'}</span>
          <span className="font-inter font-semibold text-[14px] leading-[14px] text-[#333333]">{profile?.phone || '(+880) 1706-020534'}</span>
        </div>
        <span className="font-geist font-medium text-[14px] leading-[20px] text-[#333333] opacity-90">© 2026</span>
      </FadeIn>
    </aside>
  );
}
