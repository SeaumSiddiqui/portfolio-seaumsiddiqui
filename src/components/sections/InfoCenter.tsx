import React from 'react';
import { motion } from 'motion/react';
import { useSanityProfile } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity';
import { recordResumeClick } from '../../lib/telemetry';
import type { SoftwareStackItem, ExperienceItem } from '../../types/sanity';

function SoftwareIcon({ name }: { name: string }) {
  const n = (name || '').toLowerCase();

  // 1. Java
  if (n.includes('java') && !n.includes('javascript')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    );
  }

  // 2. Spring / Spring Boot
  if (n.includes('spring')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }

  // 3. PostgreSQL / Postgres / SQL / Database
  if (n.includes('postgres') || n.includes('sql') || n.includes('database')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // 4. Redis / Cache
  if (n.includes('redis') || n.includes('cache')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }

  // 5. Docker / Container
  if (n.includes('docker') || n.includes('container')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 13a18.1 18.1 0 0 1-20 0" />
        <path d="M2 13c1 4 4 7 10 7s9-3 10-7" />
        <rect x="6" y="8" width="3" height="3" />
        <rect x="10" y="8" width="3" height="3" />
        <rect x="14" y="8" width="3" height="3" />
        <rect x="10" y="4" width="3" height="3" />
      </svg>
    );
  }

  // 6. AWS / Cloud
  if (n.includes('aws') || n.includes('cloud')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    );
  }

  // 7. Git / GitHub
  if (n.includes('git')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    );
  }

  // 8. Python
  if (n.includes('python')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a5 5 0 0 0-5 5v2H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2v-2a3 3 0 0 1 3-3h4a3 3 0 0 0 3-3V7a5 5 0 0 0-5-5Z" />
        <path d="M12 22a5 5 0 0 0 5-5v-2h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-2v2a3 3 0 0 1-3 3h-4a3 3 0 0 0-3 3v2a5 5 0 0 0 5 5Z" />
      </svg>
    );
  }

  // 9. Linux / Terminal / Bash
  if (n.includes('linux') || n.includes('terminal') || n.includes('bash')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    );
  }

  // 10. Postman / API / REST
  if (n.includes('postman') || n.includes('api') || n.includes('rest')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }

  // 11. Security / Auth / Keycloak
  if (n.includes('keycloak') || n.includes('auth') || n.includes('security')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

  // 12. React
  if (n.includes('react')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }

  // 13. TypeScript / TS
  if (n.includes('typescript') || n.includes('ts')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M6 7h6M9 7v10M14 10h4M16 10v7" />
      </svg>
    );
  }

  // 14. JavaScript / JS
  if (n.includes('javascript') || n.includes('js')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M9 13v3a2 2 0 0 1-2 2M15 11v6a1 1 0 0 1-2 1" />
      </svg>
    );
  }

  // 15. Node.js
  if (n.includes('node')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 21 7.5 21 16.5 12 22 3 16.5 3 7.5 12 2" />
        <polyline points="12 12 12 22" />
        <polyline points="12 12 21 7.5" />
        <polyline points="12 12 3 7.5" />
      </svg>
    );
  }

  // 16. Next.js
  if (n.includes('next')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 8v8M15 8v8M9 8l7 9" />
      </svg>
    );
  }

  // 17. MySQL
  if (n.includes('mysql')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    );
  }

  // 18. MongoDB
  if (n.includes('mongo')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-5-5-11-5-11z" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    );
  }

  // 19. Kubernetes / K8s
  if (n.includes('kubernetes') || n.includes('k8s')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3" x2="12" y2="9" />
        <line x1="12" y1="15" x2="12" y2="21" />
        <line x1="4.2" y1="7.5" x2="9.4" y2="10.5" />
        <line x1="14.6" y1="13.5" x2="19.8" y2="16.5" />
      </svg>
    );
  }

  // 20. Kafka / RabbitMQ / Queue / Event
  if (n.includes('kafka') || n.includes('rabbitmq') || n.includes('queue')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="6" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="M8 12h8M16 7l-8 4M16 17l-8-4" />
      </svg>
    );
  }

  // 21. GraphQL
  if (n.includes('graphql')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="4" r="2" />
        <circle cx="19" cy="8" r="2" />
        <circle cx="19" cy="16" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="5" cy="16" r="2" />
        <circle cx="5" cy="8" r="2" />
        <polygon points="12 4 19 8 19 16 12 20 5 16 5 8" />
      </svg>
    );
  }

  // 22. IntelliJ IDEA
  if (n.includes('intellij') || n.includes('idea')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M6 18h4M7 8v6M13 16l3-8" />
      </svg>
    );
  }

  // 23. VS Code / Editor
  if (n.includes('vscode') || n.includes('vs code') || n.includes('editor')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m16.5 2 5.5 2.5v15L16.5 22 6 14.5l-4 3.5V6l4 3.5z" />
      </svg>
    );
  }

  // 24. C / C++
  if (n.includes('c++') || n.includes('cpp')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 9a4 4 0 0 0-4 4 4 4 0 0 0 4 4" />
        <path d="M14 12h4M16 10v4M19 12h4M21 10v4" />
      </svg>
    );
  }

  // 25. Golang / Go
  if (n === 'go' || n.includes('golang')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="12" r="4" />
        <path d="M14 12a4 4 0 1 0 4 4v-4h-4" />
      </svg>
    );
  }

  // 26. Figma
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

  // 27. Framer
  if (n.includes('framer')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
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
                  {item.iconImage ? (
                    <img
                      src={urlFor(item.iconImage).width(48).height(48).url()}
                      alt={item.name}
                      className="w-4 h-4 object-contain"
                    />
                  ) : (
                    <SoftwareIcon name={item.icon || item.name} />
                  )}
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
