"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../motion/FadeIn';
import { RevealText } from '../motion/RevealText';
import { useSanityProfile } from '../../hooks/useSanity';
import { recordResumeClick } from '../../lib/telemetry';

export function Sidebar() {
  const { profile, isLoading } = useSanityProfile();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[15px] lg:pr-[30px] pt-24 pb-2 overflow-y-auto no-scrollbar overflow-x-hidden">
      {/* Top Welcome Text */}
      <div className="w-full shrink-0" style={{ containerType: 'inline-size' }}>
        <div className="font-geist font-medium text-[clamp(24px,12cqw,56px)] leading-[1] tracking-[-0.06em] text-brand-text whitespace-nowrap">
          {isLoading ? (
            <div className="h-[120px] bg-brand-surface animate-pulse rounded-[2px]"></div>
          ) : (
            <>
              <RevealText text="Hello!" delay={0.1} />
              <br />
              <RevealText text={`I'm ${profile?.name || 'Seaum Siddiqui'}.`} delay={0.2} />
            </>
          )}
        </div>
      </div>

      {/* Social Icons & Action Links */}
      <FadeIn delay={0.3} className="flex flex-col flex-1 mt-2 lg:mt-12 w-full">
        {/* Social SVGs (Horizontal on mobile, Vertical on desktop) */}
        <div className="flex flex-row lg:flex-col gap-3 text-brand-text mt-0 lg:mt-auto lg:mb-10 mb-10 shrink-0">
          <a href={profile?.linkedinUrl || "#"} target={profile?.linkedinUrl ? "_blank" : "_self"} rel="noreferrer" aria-label="LinkedIn" className="hover:opacity-50 transition-opacity w-[18px] h-[18px] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href={profile?.githubUrl || "#"} target={profile?.githubUrl ? "_blank" : "_self"} rel="noreferrer" aria-label="GitHub" className="hover:opacity-50 transition-opacity w-[18px] h-[18px] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href={profile?.leetcodeUrl || "#"} target={profile?.leetcodeUrl ? "_blank" : "_self"} rel="noreferrer" aria-label="LeetCode" className="hover:opacity-50 transition-opacity w-[18px] h-[18px] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </a>
        </div>

        {/* Action Links & Accordions List */}
        <div className="flex flex-col text-[16px] leading-[22px] font-geist font-medium text-brand-text w-full mt-auto shrink-0 mb-12 lg:mb-0">
          <a 
            href={profile?.resumeUrl || "#"} 
            target={profile?.resumeUrl ? "_blank" : "_self"} 
            rel={profile?.resumeUrl ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (!profile?.resumeUrl) e.preventDefault();
              recordResumeClick('sidebar');
            }}
            className="flex items-center justify-between pb-1 cursor-pointer group hover:opacity-70 transition-opacity"
          >
            <span>View Resume</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-brand-text -rotate-45 group-hover:rotate-0 transition-transform duration-300">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
          
          <div className="border-t border-brand-border py-1">
            <div 
              className="flex items-center justify-between cursor-pointer group hover:opacity-70 transition-opacity"
              onClick={() => toggleSection('expertise')}
            >
              <span>Expertise and Skills</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-brand-text transition-transform duration-300">
                <path 
                  d={openSection === 'expertise' ? "M5 12h14" : "M12 5v14 M5 12h14"}
                  style={{ transition: 'd 0.3s ease' }}
                />
              </svg>
            </div>
            {/* Collapsible Content: Expertise */}
            <AnimatePresence>
              {openSection === 'expertise' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 pt-6 pb-2 text-[11px] font-mono leading-relaxed opacity-80 uppercase tracking-tight">
                    {profile?.expertise?.length ? (
                      profile.expertise.map((cat, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                          <div className="font-bold mb-1">{cat.category}</div>
                          {cat.skills?.map((skill, sIdx) => (
                            <div key={sIdx}>{skill}</div>
                          ))}
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex flex-col gap-1">
                          <div className="font-bold mb-1">Core</div>
                          <div>Java</div>
                          <div>Spring Boot</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-bold mb-1">Data</div>
                          <div>PostgreSQL</div>
                          <div>Redis</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-bold mb-1">Deploy</div>
                          <div>Vercel</div>
                          <div>Oracle</div>
                          <div>AWS</div>
                          <div>Docker</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-bold mb-1">Tools</div>
                          <div>Postman</div>
                          <div>Keycloak</div>
                          <div>Sanity CMS</div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-brand-border pt-1 pb-0">
            <div 
              className="flex items-center justify-between cursor-pointer group hover:opacity-70 transition-opacity"
              onClick={() => toggleSection('awards')}
            >
              <span>Awards and Certifications</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-brand-text transition-transform duration-300">
                <path 
                  d={openSection === 'awards' ? "M5 12h14" : "M12 5v14 M5 12h14"}
                  style={{ transition: 'd 0.3s ease' }}
                />
              </svg>
            </div>
            {/* Collapsible Content: Awards */}
            <AnimatePresence>
              {openSection === 'awards' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-2 pt-4 pb-2 text-[11px] font-mono leading-relaxed opacity-80 uppercase tracking-tight">
                    {profile?.awards?.length ? (
                      profile.awards.map((award, idx) => (
                        <div key={idx}>• {award}</div>
                      ))
                    ) : (
                      <>
                        <div>• AWS Certified Solutions Architect</div>
                        <div>• Oracle Certified Professional</div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </FadeIn>
    </aside>
  );
}
