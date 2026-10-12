import React from 'react';
import { FadeIn } from '../motion/FadeIn';
import type { TelemetryState } from '../../lib/telemetry';

interface DashboardRightSidebarProps {
  telemetry: TelemetryState;
}

export function DashboardRightSidebar({ telemetry }: DashboardRightSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[30px] lg:pr-[15px] pt-8 lg:pt-14 pb-12 lg:pb-6 overflow-y-auto no-scrollbar overflow-x-hidden">
      <div>
        {/* 1. Resume Conversion Funnel */}
        <FadeIn delay={0.15}>
          <div className="pb-5 border-b border-brand-border">
            <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-2">
              Resume Conversion Funnel
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-geist font-medium text-[26px] leading-tight tracking-tight text-brand-text">
                {telemetry.resumeClicks.total}
              </span>
              <span className="font-mono text-[11px] text-emerald-600 font-semibold">
                {((telemetry.resumeClicks.total / Math.max(telemetry.uniqueVisitors, 1)) * 100).toFixed(1)}% Conversion
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-3 text-[12px] font-inter">
              <div className="flex justify-between items-center">
                <span className="text-[rgb(117,117,117)]">Desktop Sidebar</span>
                <span className="font-mono text-brand-text font-medium">
                  {telemetry.resumeClicks.sidebar} ({Math.round((telemetry.resumeClicks.sidebar / Math.max(telemetry.resumeClicks.total, 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-1 bg-brand-border rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((telemetry.resumeClicks.sidebar / Math.max(telemetry.resumeClicks.total, 1)) * 100)}%`,
                  }}
                  className="h-full bg-brand-text"
                />
              </div>

              <div className="flex justify-between items-center mt-1">
                <span className="text-[rgb(117,117,117)]">Info Page Experience</span>
                <span className="font-mono text-brand-text font-medium">
                  {telemetry.resumeClicks.infoPage} ({Math.round((telemetry.resumeClicks.infoPage / Math.max(telemetry.resumeClicks.total, 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-1 bg-brand-border rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${Math.round((telemetry.resumeClicks.infoPage / Math.max(telemetry.resumeClicks.total, 1)) * 100)}%`,
                  }}
                  className="h-full bg-brand-muted"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 2. Outreach & Social Interaction Triggers */}
        <FadeIn delay={0.2} className="py-5 border-b border-brand-border">
          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-2">
            Outreach & External Links
          </div>
          <div className="flex flex-col gap-2 text-[12px] font-inter">
            <div className="flex justify-between items-center">
              <span className="text-brand-text">GitHub Profile</span>
              <span className="font-mono font-medium text-brand-text">{telemetry.outreachClicks.github}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-text">LinkedIn Profile</span>
              <span className="font-mono font-medium text-brand-text">{telemetry.outreachClicks.linkedin}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-text">LeetCode Profile</span>
              <span className="font-mono font-medium text-brand-text">{telemetry.outreachClicks.leetcode}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-text">Direct Email Inquiries</span>
              <span className="font-mono font-medium text-brand-text">{telemetry.outreachClicks.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-text">Phone / WhatsApp Contact</span>
              <span className="font-mono font-medium text-brand-text">{telemetry.outreachClicks.phone}</span>
            </div>
          </div>
        </FadeIn>

        {/* 3. Devices & Browsers */}
        <FadeIn delay={0.25} className="py-5 border-b border-brand-border">
          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-2">
            Device Distribution
          </div>
          <div className="flex flex-col gap-2 text-[12px] font-inter">
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Mobile</span>
              <span className="font-mono font-medium text-brand-text">{telemetry.devices.mobile}%</span>
            </div>
            <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden flex">
              <div style={{ width: `${telemetry.devices.mobile}%` }} className="h-full bg-brand-text" />
              <div style={{ width: `${telemetry.devices.desktop}%` }} className="h-full bg-brand-muted opacity-60" />
              <div style={{ width: `${telemetry.devices.tablet}%` }} className="h-full bg-brand-border" />
            </div>
            <div className="flex justify-between text-[11px] text-[rgb(117,117,117)] font-mono mt-0.5">
              <span>Desktop: {telemetry.devices.desktop}%</span>
              <span>Tablet: {telemetry.devices.tablet}%</span>
            </div>
          </div>

          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mt-4 mb-2">
            Top Browsers
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[rgb(117,117,117)]">
            {telemetry.browsers.map((b) => (
              <div key={b.name} className="flex justify-between border-b border-brand-border pb-1">
                <span>{b.name}</span>
                <span className="font-medium text-brand-text">{b.percentage}%</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 4. Top Referrers */}
        <FadeIn delay={0.3} className="py-5 border-b border-brand-border">
          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-2">
            Traffic Referrers
          </div>
          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            {telemetry.referrers.map((ref) => (
              <div key={ref.name} className="flex justify-between items-center">
                <span className="truncate max-w-[170px] text-brand-text font-medium text-[11px] font-mono">
                  {ref.name}
                </span>
                <span className="font-mono text-[11px] text-[rgb(117,117,117)]">
                  {ref.percentage}%
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 5. Geographic Distribution */}
        <FadeIn delay={0.35} className="py-5">
          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-2">
            Audience Origins
          </div>
          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            {telemetry.topRegions.map((r) => (
              <div key={r.region} className="flex justify-between items-center">
                <span className="text-brand-text text-[12px]">{r.region}</span>
                <span className="font-mono text-[11px] text-brand-text font-medium">{r.percentage}%</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Security seal and access indicator */}
      <FadeIn delay={0.4} className="pt-6 mt-6 border-t border-brand-border text-brand-muted">
        <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono font-medium text-brand-text uppercase">
          <span>◆</span>
          <span>Security & Telemetry Enclave</span>
        </div>
        <p className="text-[11px] font-inter text-[rgb(117,117,117)] leading-relaxed">
          Authorized console session active for Seaum Siddiqui.
        </p>
        <div className="text-[11px] font-mono text-[rgb(117,117,117)] mt-3">
          © {new Date().getFullYear()} Seaum Siddiqui
        </div>
      </FadeIn>
    </aside>
  );
}
