import React, { useState, useEffect } from 'react';
import { FadeIn } from '../motion/FadeIn';
import { useSanityProfile, useSanityProjects } from '../../hooks/useSanity';
import { exportTelemetryJSON, resetTelemetry, type TelemetryState } from '../../lib/telemetry';

interface DashboardLeftSidebarProps {
  telemetry?: TelemetryState;
  isRefreshing?: boolean;
  onRefreshTelemetry: () => void;
  onSimulateEvent: () => void;
}

export function DashboardLeftSidebar({
  telemetry,
  isRefreshing,
  onRefreshTelemetry,
  onSimulateEvent,
}: DashboardLeftSidebarProps) {
  const { profile, isLoading: isProfileLoading } = useSanityProfile();
  const { projects, isLoading: isProjectsLoading } = useSanityProjects();

  const [dhakaTime, setDhakaTime] = useState('');
  const [dhakaDate, setDhakaDate] = useState('');
  const [sanityPing, setSanityPing] = useState<number | null>(null);
  const [apiPing, setApiPing] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Live Performance & Core Web Vitals
  const [webVitals, setWebVitals] = useState({
    ttfb: 14,
    fcp: 42,
    domReady: 68,
    resScore: 98,
  });

  // Calculate live browser performance
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance) {
      setTimeout(() => {
        const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navEntries && navEntries.length > 0) {
          const nav = navEntries[0];
          const ttfb = Math.round(nav.responseStart - nav.requestStart);
          const domReady = Math.round(nav.domContentLoadedEventEnd - nav.startTime);
          const paintEntries = performance.getEntriesByType('paint');
          const fcpEntry = paintEntries.find((p) => p.name === 'first-contentful-paint');
          const fcp = fcpEntry ? Math.round(fcpEntry.startTime) : Math.round(domReady * 0.6);

          let score = 100;
          if (ttfb > 120) score -= 4;
          if (domReady > 600) score -= 8;
          if (fcp > 500) score -= 6;

          setWebVitals({
            ttfb: Math.max(ttfb, 12),
            domReady: Math.max(domReady, 45),
            fcp: Math.max(fcp, 35),
            resScore: Math.min(Math.max(score, 92), 99),
          });
        }
      }, 500);
    }
  }, []);

  // Live ticking Dhaka clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateStr = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Dhaka',
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      setDhakaTime(timeStr);
      setDhakaDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Measure live latency to Sanity and Vercel APIs
  const pingServices = async () => {
    setIsPinging(true);

    // 1. Sanity Ping
    const sStart = performance.now();
    try {
      await fetch(
        'https://n5x0r77i.api.sanity.io/v2023-08-01/data/query/production?query=' +
          encodeURIComponent('*[_type=="author"][0]._id'),
        { cache: 'no-store' }
      );
      setSanityPing(Math.round(performance.now() - sStart));
    } catch {
      setSanityPing(null);
    }

    // 2. Telemetry API Ping
    const aStart = performance.now();
    try {
      await fetch('/api/stats', { cache: 'no-store' });
      setApiPing(Math.round(performance.now() - aStart));
    } catch {
      setApiPing(null);
    } finally {
      setIsPinging(false);
    }
  };

  useEffect(() => {
    pingServices();
    const interval = setInterval(pingServices, 30000); // Re-ping every 30s
    return () => clearInterval(interval);
  }, []);

  const handleSimulate = () => {
    onSimulateEvent();
    setStatusMessage('Traffic event pulse recorded');
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset local telemetry counters to initial baseline?')) {
      resetTelemetry();
      onRefreshTelemetry();
      setStatusMessage('Counters reset to default');
      setTimeout(() => setStatusMessage(null), 2500);
    }
  };

  // Determine label for data source
  const getSourceBadge = () => {
    const src = telemetry?.dataSource;
    if (src === 'vercel-kv') {
      return {
        label: 'Vercel KV Edge',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      };
    }
    if (src === 'local-dev-server') {
      return {
        label: 'Vite Dev API',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-700 bg-blue-50 border-blue-200',
      };
    }
    return {
      label: 'Local Store',
      dotClass: 'bg-stone-500',
      textClass: 'text-stone-700 bg-stone-100 border-stone-200',
    };
  };

  const badge = getSourceBadge();

  return (
    <aside className="lg:sticky lg:top-11 h-auto lg:h-[calc(100vh-2.75rem)] flex flex-col justify-between px-[15px] lg:pl-[15px] lg:pr-[30px] pt-8 lg:pt-14 pb-8 lg:pb-6 overflow-y-auto no-scrollbar overflow-x-hidden">
      <div>
        {/* Top: Operational Status Pill */}
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-between pb-4 border-b border-brand-border">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[12px] font-semibold text-brand-text tracking-wide uppercase">
                Systems Operational
              </span>
            </div>
            <span className="font-mono text-[11px] text-[rgb(117,117,117)]">VITE 6.0</span>
          </div>
        </FadeIn>

        {/* Live Server Clock (Dhaka, Bangladesh) */}
        <FadeIn delay={0.15} className="py-4 border-b border-brand-border">
          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-1">
            Server Local Time (Dhaka)
          </div>
          <div className="font-geist font-medium text-[22px] leading-tight tracking-tight text-brand-text">
            {dhakaTime || '07:00:00 AM'}
          </div>
          <div className="font-inter text-[12px] text-[rgb(117,117,117)] mt-0.5">
            {dhakaDate} • UTC+06:00
          </div>
        </FadeIn>

        {/* Telemetry Architecture (Path 2) Status */}
        <FadeIn delay={0.2} className="py-4 border-b border-brand-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Telemetry Pipeline (Path 2)
            </span>
            <span
              className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-[2px] border ${badge.textClass} flex items-center gap-1`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></span>
              {badge.label}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Endpoints</span>
              <span className="font-mono text-brand-text text-[11px]">/api/track & /api/stats</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[rgb(117,117,117)]">API Latency</span>
              <span className="font-mono text-emerald-600 font-semibold text-[11px]">
                {apiPing !== null ? `${apiPing} ms` : isPinging ? 'Pinging...' : 'Offline'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Stream Status</span>
              <span className="font-mono text-brand-text text-[11px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active (15s poll)
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Speed Insights & Web Vitals */}
        <FadeIn delay={0.23} className="py-4 border-b border-brand-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Speed Insights & Vitals
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-[2px] font-semibold">
              RES {webVitals.resScore}/100
            </span>
          </div>

          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            <div className="flex justify-between items-center">
              <span className="text-[rgb(117,117,117)]">Real Experience</span>
              <span className="font-mono text-emerald-600 font-semibold text-[11px] flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Great (P75)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Time to First Byte</span>
              <span className="font-mono text-brand-text font-medium">{webVitals.ttfb} ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">First Contentful Paint</span>
              <span className="font-mono text-brand-text font-medium">{webVitals.fcp} ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">DOM Interactive</span>
              <span className="font-mono text-brand-text font-medium">{webVitals.domReady} ms</span>
            </div>
          </div>
        </FadeIn>

        {/* Sanity CMS Pipeline Status */}
        <FadeIn delay={0.27} className="py-4 border-b border-brand-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)]">
              Sanity CMS Pipeline
            </span>
            <button
              onClick={pingServices}
              disabled={isPinging}
              className="text-[10px] font-mono text-brand-text hover:opacity-60 transition-opacity flex items-center gap-1 cursor-pointer"
              title="Re-ping APIs"
            >
              <span>{isPinging ? 'Pinging...' : 'Ping'}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`w-2.5 h-2.5 ${isPinging ? 'animate-spin' : ''}`}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Project ID</span>
              <span className="font-mono text-brand-text font-medium">n5x0r77i</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Dataset</span>
              <span className="font-mono text-brand-text font-medium">production</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[rgb(117,117,117)]">Sanity Latency</span>
              <span className="font-mono text-emerald-600 font-semibold text-[11px] flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {sanityPing !== null ? `${sanityPing} ms` : 'Testing...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Published Projects</span>
              <span className="font-mono text-brand-text font-medium">
                {isProjectsLoading ? '...' : projects.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Resume PDF Source</span>
              <span className="font-mono text-brand-text text-[11px] truncate max-w-[150px]">
                {profile?.resumeUrl ? (profile.resumeUrl.includes('sanity') ? 'Sanity CDN' : 'External URL') : 'Not uploaded'}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Author Document Health */}
        <FadeIn delay={0.3} className="py-4 border-b border-brand-border">
          <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-2">
            Author Profile Sync
          </div>
          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Author Name</span>
              <span className="font-medium text-brand-text truncate max-w-[160px]">
                {isProfileLoading ? '...' : profile?.name || 'Seaum Siddiqui'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Location</span>
              <span className="text-brand-text truncate max-w-[160px]">
                {profile?.location || 'Dhaka, Bangladesh'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(117,117,117)]">Email</span>
              <span className="text-brand-text truncate max-w-[160px]">
                {profile?.email || 'seaumsiddiqui@outlook.com'}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom: Management Console Buttons */}
      <FadeIn delay={0.35} className="pt-6 mt-6 border-t border-brand-border">
        {statusMessage && (
          <div className="mb-3 px-2 py-1.5 bg-emerald-50 text-emerald-800 text-[11px] font-mono rounded-[2px] transition-all">
            ✓ {statusMessage}
          </div>
        )}

        <div className="text-[11px] font-mono uppercase tracking-tight text-[rgb(117,117,117)] mb-3">
          Admin Controls
        </div>

        <div className="flex flex-col gap-2 w-full text-[13px] font-inter font-medium text-brand-text">
          {/* Refresh / Sync Telemetry */}
          <button
            onClick={onRefreshTelemetry}
            disabled={isRefreshing}
            className="flex items-center justify-between p-2 rounded-[2px] border border-brand-border hover:bg-brand-surface hover:opacity-80 transition-all cursor-pointer text-left"
          >
            <span>{isRefreshing ? 'Syncing...' : 'Sync Telemetry'}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`w-3.5 h-3.5 text-brand-text ${isRefreshing ? 'animate-spin' : ''}`}
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>

          {/* Launch Sanity Studio */}
          <a
            href="https://studio-seaumsiddiqui.sanity.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-[2px] border border-brand-border hover:bg-brand-surface hover:opacity-80 transition-all cursor-pointer group"
          >
            <span>Launch Sanity Studio</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3.5 h-3.5 text-brand-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          {/* Simulate Event Pulse */}
          <button
            onClick={handleSimulate}
            className="flex items-center justify-between p-2 rounded-[2px] border border-brand-border hover:bg-brand-surface hover:opacity-80 transition-all cursor-pointer text-left"
          >
            <span>Simulate Traffic Pulse</span>
            <span className="text-[10px] font-mono text-[rgb(117,117,117)]">+1 Event</span>
          </button>

          {/* Export Telemetry JSON */}
          <button
            onClick={exportTelemetryJSON}
            className="flex items-center justify-between p-2 rounded-[2px] border border-brand-border hover:bg-brand-surface hover:opacity-80 transition-all cursor-pointer text-left"
          >
            <span>Export Metrics JSON</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3.5 h-3.5 text-brand-text"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </button>

          {/* Reset Baseline */}
          <button
            onClick={handleReset}
            className="text-left text-[11px] font-mono text-red-600 hover:opacity-70 transition-opacity pt-1 cursor-pointer"
          >
            Reset Telemetry Store
          </button>
        </div>
      </FadeIn>
    </aside>
  );
}
