import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../motion/FadeIn';
import { useSanityProjects } from '../../hooks/useSanity';
import type { TelemetryState } from '../../lib/telemetry';

interface DashboardCenterProps {
  telemetry: TelemetryState;
}

export function DashboardCenter({ telemetry }: DashboardCenterProps) {
  const { projects } = useSanityProjects();

  const maxDailyViews = Math.max(...telemetry.dailyViews.map((d) => d.views), 1);

  // Format relative time helper
  const formatTimeAgo = (ts: number) => {
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.floor(diffHr / 24)}d ago`;
  };

  return (
    <main className="flex flex-col px-[15px] pt-8 lg:pt-14 pb-20 w-full min-w-0">
      {/* 1. Header & Title */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-1 pb-8 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Secret Endpoint Console
            </span>
            <span className="text-[10px] font-mono bg-brand-surface px-1.5 py-0.5 rounded text-brand-text border border-brand-border">
              PRIVATE
            </span>
          </div>
          <h1 className="font-geist font-medium text-[32px] sm:text-[40px] lg:text-[48px] leading-[1] tracking-[-0.05em] text-brand-text">
            Site Telemetry
          </h1>
          <p className="font-inter text-[14px] leading-relaxed text-[rgb(117,117,117)] mt-1 max-w-xl">
            Real-time analytics, visitor engagement tracking, and live Sanity CMS data pipeline for Seaum Siddiqui's portfolio.
          </p>
        </div>
      </FadeIn>

      {/* 2. Key Metrics Ribbon (4 Cards) */}
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-brand-border">
          {/* Card 1: Total Views */}
          <div className="flex flex-col p-3 rounded-[2px] bg-brand-surface/60 border border-brand-border">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Total Pageviews
            </span>
            <div className="font-geist font-medium text-[24px] lg:text-[28px] leading-tight tracking-tight text-brand-text mt-1">
              {telemetry.totalPageviews.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-emerald-600">
              <span>↑ 14.2%</span>
              <span className="text-[rgb(117,117,117)]">vs last week</span>
            </div>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="flex flex-col p-3 rounded-[2px] bg-brand-surface/60 border border-brand-border">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Unique Visitors
            </span>
            <div className="font-geist font-medium text-[24px] lg:text-[28px] leading-tight tracking-tight text-brand-text mt-1">
              {telemetry.uniqueVisitors.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-brand-text">
              <span className="text-[rgb(117,117,117)]">Mobile:</span>
              <span>{telemetry.devices.mobile}%</span>
            </div>
          </div>

          {/* Card 3: Resume Actions */}
          <div className="flex flex-col p-3 rounded-[2px] bg-brand-surface/60 border border-brand-border">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Resume Views
            </span>
            <div className="font-geist font-medium text-[24px] lg:text-[28px] leading-tight tracking-tight text-brand-text mt-1">
              {telemetry.resumeClicks.total}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-emerald-600">
              <span>
                {((telemetry.resumeClicks.total / Math.max(telemetry.uniqueVisitors, 1)) * 100).toFixed(1)}%
              </span>
              <span className="text-[rgb(117,117,117)]">click rate</span>
            </div>
          </div>

          {/* Card 4: CMS Projects */}
          <div className="flex flex-col p-3 rounded-[2px] bg-brand-surface/60 border border-brand-border">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Sanity Projects
            </span>
            <div className="font-geist font-medium text-[24px] lg:text-[28px] leading-tight tracking-tight text-brand-text mt-1">
              {projects.length}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-brand-text">
              <span>{projects.filter((p) => p.selectedWork).length}</span>
              <span className="text-[rgb(117,117,117)]">selected work</span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 3. Weekly Traffic Velocity (Bar Chart) */}
      <FadeIn delay={0.2} className="py-8 border-b border-brand-border">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h2 className="font-geist font-medium text-[18px] lg:text-[20px] tracking-tight text-brand-text">
              7-Day Traffic Velocity
            </h2>
            <p className="text-[12px] font-inter text-[rgb(117,117,117)]">
              Daily pageviews recorded across all sessions
            </p>
          </div>
          <span className="font-mono text-[11px] text-[rgb(117,117,117)]">
            Avg {Math.round(telemetry.totalPageviews / 14)} views / day
          </span>
        </div>

        {/* Minimalist Swiss Bar Chart */}
        <div className="flex items-end gap-2 sm:gap-4 h-36 pt-6 px-2 bg-brand-surface/30 rounded-[2px] border border-brand-border">
          {telemetry.dailyViews.map((item, idx) => {
            const heightPct = Math.max(Math.round((item.views / maxDailyViews) * 100), item.views > 0 ? 8 : 2);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-brand-text mb-1">
                  {item.views}
                </div>
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full max-w-[36px] rounded-[1px] transition-all duration-500 ${
                    item.views > 0
                      ? 'bg-brand-text group-hover:bg-brand-muted'
                      : 'bg-brand-border'
                  }`}
                />
                <span className="font-mono text-[10px] text-[rgb(117,117,117)] mt-2">
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* 4. Route Performance & Page Popularity Table */}
      <FadeIn delay={0.25} className="py-8 border-b border-brand-border">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h2 className="font-geist font-medium text-[18px] lg:text-[20px] tracking-tight text-brand-text">
              Page Popularity & Route Traffic
            </h2>
            <p className="text-[12px] font-inter text-[rgb(117,117,117)]">
              Real-time hits and engagement by pathname
            </p>
          </div>
          <span className="font-mono text-[11px] text-[rgb(117,117,117)]">
            {Object.keys(telemetry.pageviews).length} active routes
          </span>
        </div>

        <div className="flex flex-col w-full border border-brand-border rounded-[2px] overflow-hidden">
          <div className="flex justify-between items-center py-2 px-3 bg-brand-surface/80 border-b border-brand-border text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
            <span className="w-1/2">Route Path</span>
            <span className="w-1/4 text-right">Pageviews</span>
            <span className="w-1/4 text-right">Share</span>
          </div>

          {Object.entries(telemetry.pageviews)
            .sort(([, a], [, b]) => b - a)
            .map(([path, views], idx) => {
              const sharePct = ((views / Math.max(telemetry.totalPageviews, 1)) * 100).toFixed(1);
              return (
                <div
                  key={path}
                  className={`flex justify-between items-center py-2.5 px-3 text-[13px] font-inter ${
                    idx !== 0 ? 'border-t border-brand-border' : ''
                  } hover:bg-brand-surface/40 transition-colors`}
                >
                  <div className="w-1/2 flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[11px] text-[rgb(117,117,117)]">{idx + 1}.</span>
                    <Link
                      to={path}
                      className="font-mono text-[13px] text-brand-text hover:underline truncate"
                      title={`Open ${path}`}
                    >
                      {path}
                    </Link>
                  </div>
                  <div className="w-1/4 text-right font-mono text-[12px] font-medium text-brand-text">
                    {views.toLocaleString()}
                  </div>
                  <div className="w-1/4 text-right flex items-center justify-end gap-2">
                    <div className="hidden sm:block w-12 h-1.5 bg-brand-border rounded-full overflow-hidden">
                      <div
                        style={{ width: `${sharePct}%` }}
                        className="h-full bg-brand-text rounded-full"
                      />
                    </div>
                    <span className="font-mono text-[11px] text-[rgb(117,117,117)] min-w-[38px] text-right">
                      {sharePct}%
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </FadeIn>

      {/* 5. Live Published Projects in Sanity */}
      <FadeIn delay={0.3} className="py-8 border-b border-brand-border">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h2 className="font-geist font-medium text-[18px] lg:text-[20px] tracking-tight text-brand-text">
              Sanity Content Inventory
            </h2>
            <p className="text-[12px] font-inter text-[rgb(117,117,117)]">
              Live projects currently published in Sanity Studio
            </p>
          </div>
          <span className="font-mono text-[11px] text-[rgb(117,117,117)]">
            Dataset: production
          </span>
        </div>

        <div className="flex flex-col w-full border border-brand-border rounded-[2px] overflow-hidden">
          <div className="flex justify-between items-center py-2 px-3 bg-brand-surface/80 border-b border-brand-border text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
            <span className="w-2/5">Title & Category</span>
            <span className="w-1/5 text-center">Year</span>
            <span className="w-1/5 text-center">Selected</span>
            <span className="w-1/5 text-right">Preview</span>
          </div>

          {projects.map((proj, idx) => (
            <div
              key={proj._id}
              className={`flex justify-between items-center py-3 px-3 text-[13px] font-inter ${
                idx !== 0 ? 'border-t border-brand-border' : ''
              } hover:bg-brand-surface/40 transition-colors`}
            >
              <div className="w-2/5 flex flex-col min-w-0 pr-2">
                <span className="font-geist font-medium text-[14px] text-brand-text truncate">
                  {proj.title}
                </span>
                <span className="text-[11px] text-[rgb(117,117,117)] font-mono truncate">
                  {proj.category || 'Engineering'}
                </span>
              </div>
              <div className="w-1/5 text-center font-mono text-[12px] text-[rgb(117,117,117)]">
                {proj.year || '2026'}
              </div>
              <div className="w-1/5 text-center">
                {proj.selectedWork ? (
                  <span className="inline-block px-1.5 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-800 text-[10px] font-mono font-medium border border-emerald-200">
                    FEATURED
                  </span>
                ) : (
                  <span className="inline-block px-1.5 py-0.5 rounded-[2px] bg-brand-surface text-[rgb(117,117,117)] text-[10px] font-mono border border-brand-border">
                    STANDARD
                  </span>
                )}
              </div>
              <div className="w-1/5 text-right">
                <Link
                  to={`/work/${proj.slug.current}`}
                  className="font-inter text-[12px] font-medium text-brand-text hover:opacity-60 transition-opacity underline cursor-pointer"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 6. Real-Time Activity Log / Stream */}
      <FadeIn delay={0.35} className="py-8">
        <div className="flex justify-between items-baseline mb-4">
          <div>
            <h2 className="font-geist font-medium text-[18px] lg:text-[20px] tracking-tight text-brand-text">
              Live Activity Stream
            </h2>
            <p className="text-[12px] font-inter text-[rgb(117,117,117)]">
              Audited visitor events and system actions
            </p>
          </div>
          <span className="font-mono text-[11px] text-[rgb(117,117,117)] flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Streaming
          </span>
        </div>

        <div className="flex flex-col w-full border border-brand-border rounded-[2px] divide-y divide-brand-border">
          {telemetry.recentEvents.slice(0, 10).map((ev) => (
            <div
              key={ev.id}
              className="flex justify-between items-center py-2.5 px-3 text-[13px] font-inter hover:bg-brand-surface/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span
                  className={`px-1.5 py-0.5 rounded-[2px] text-[10px] font-mono font-medium uppercase ${
                    ev.type === 'resume'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : ev.type === 'outreach'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : ev.type === 'system'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-brand-surface text-brand-text border border-brand-border'
                  }`}
                >
                  {ev.type}
                </span>
                <span className="text-brand-text truncate font-medium text-[13px]">
                  {ev.label}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[rgb(117,117,117)] shrink-0">
                {formatTimeAgo(ev.timestamp)}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}
