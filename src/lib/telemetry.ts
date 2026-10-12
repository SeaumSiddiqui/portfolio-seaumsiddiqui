// Telemetry and Analytics Store for Seaum Siddiqui's Portfolio
// Centralized Path 2: Connects to Vercel Serverless API (/api/track & /api/stats)
// with resilient localStorage syncing and real-time event subscription.

export interface TelemetryEvent {
  id: string;
  type: 'pageview' | 'resume' | 'outreach' | 'system';
  label: string;
  path?: string;
  timestamp: number;
  meta?: Record<string, any>;
}

export interface TelemetryState {
  totalPageviews: number;
  uniqueVisitors: number;
  activeSessions: number;
  pageviews: Record<string, number>;
  resumeClicks: {
    total: number;
    sidebar: number;
    infoPage: number;
  };
  outreachClicks: {
    email: number;
    phone: number;
    linkedin: number;
    github: number;
    leetcode: number;
  };
  dailyViews: Array<{ day: string; views: number; date: string }>;
  recentEvents: TelemetryEvent[];
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browsers: Array<{ name: string; percentage: number }>;
  topRegions: Array<{ region: string; count: number; percentage: number }>;
  referrers: Array<{ name: string; count: number; percentage: number }>;
  dataSource?: 'vercel-kv' | 'local-dev-server' | 'local-fallback' | 'local-storage';
  lastUpdated: number;
}

const STORAGE_KEY = 'portfolio_telemetry_seaum_v1';
const VISITOR_ID_KEY = 'portfolio_visitor_id_seaum';

// Listeners for live real-time dashboard updates
type TelemetryListener = (state: TelemetryState) => void;
const listeners: Set<TelemetryListener> = new Set();

export function subscribeTelemetry(listener: TelemetryListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(state: TelemetryState) {
  listeners.forEach((listener) => {
    try {
      listener(state);
    } catch (e) {
      console.error('Error in telemetry listener:', e);
    }
  });
}

// Generate or retrieve persistent visitor ID for unique visitor accuracy
export function getVisitorId(): { id: string; isNew: boolean } {
  if (typeof window === 'undefined') return { id: 'srv', isNew: false };
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) {
      return { id: existing, isNew: false };
    }
    const newId = `vis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(VISITOR_ID_KEY, newId);
    return { id: newId, isNew: true };
  } catch {
    return { id: 'anon', isNew: false };
  }
}

// Baseline data
function getInitialTelemetry(): TelemetryState {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIdx = (new Date().getDay() + 6) % 7; // 0 for Mon, 6 for Sun

  const daily = days.map((day, idx) => {
    const isPastOrToday = idx <= todayIdx;
    const base = isPastOrToday ? Math.floor(220 + Math.random() * 180) : 0;
    return {
      day,
      views: base,
      date: `Oct ${10 + idx}`,
    };
  });

  return {
    totalPageviews: 4892,
    uniqueVisitors: 1284,
    activeSessions: 3,
    pageviews: {
      '/': 2410,
      '/info': 1180,
      '/work': 890,
      '/work/devscope': 214,
      '/work/everbloom-bd': 142,
      '/work/hookchef-api': 56,
    },
    resumeClicks: {
      total: 142,
      sidebar: 88,
      infoPage: 54,
    },
    outreachClicks: {
      email: 76,
      phone: 24,
      linkedin: 189,
      github: 312,
      leetcode: 94,
    },
    dailyViews: daily,
    recentEvents: [
      {
        id: 'ev-1',
        type: 'pageview',
        label: 'Visited Home page',
        path: '/',
        timestamp: Date.now() - 1000 * 60 * 2,
        meta: { device: 'Mobile', browser: 'Chrome', location: 'Dhaka, BD' },
      },
      {
        id: 'ev-2',
        type: 'resume',
        label: 'Viewed Resume PDF',
        path: '/info',
        timestamp: Date.now() - 1000 * 60 * 18,
        meta: { source: 'Info Page', target: 'Sanity Asset CDN' },
      },
      {
        id: 'ev-3',
        type: 'pageview',
        label: 'Inspected Project: DevScope',
        path: '/work/devscope',
        timestamp: Date.now() - 1000 * 60 * 45,
        meta: { device: 'Desktop', referrer: 'GitHub' },
      },
      {
        id: 'ev-4',
        type: 'outreach',
        label: 'Clicked GitHub profile',
        path: '/',
        timestamp: Date.now() - 1000 * 60 * 75,
        meta: { channel: 'GitHub' },
      },
      {
        id: 'ev-5',
        type: 'system',
        label: 'Sanity CMS GROQ cache revalidated',
        timestamp: Date.now() - 1000 * 60 * 120,
        meta: { latencyMs: 38, status: 200 },
      },
    ],
    devices: {
      mobile: 62,
      desktop: 34,
      tablet: 4,
    },
    browsers: [
      { name: 'Chrome', percentage: 64 },
      { name: 'Safari', percentage: 24 },
      { name: 'Firefox', percentage: 8 },
      { name: 'Edge', percentage: 4 },
    ],
    topRegions: [
      { region: 'Dhaka, Bangladesh', count: 684, percentage: 53 },
      { region: 'United States', count: 282, percentage: 22 },
      { region: 'United Kingdom / Europe', count: 180, percentage: 14 },
      { region: 'Singapore / Asia-Pac', count: 138, percentage: 11 },
    ],
    referrers: [
      { name: 'github.com/SeaumSiddiqui', count: 540, percentage: 42 },
      { name: 'Direct / Bookmarks', count: 385, percentage: 30 },
      { name: 'linkedin.com/in/seaum-siddiqui', count: 230, percentage: 18 },
      { name: 'leetcode.com', count: 129, percentage: 10 },
    ],
    dataSource: 'local-storage',
    lastUpdated: Date.now(),
  };
}

// Synchronous local state accessor
export function getTelemetry(): TelemetryState {
  if (typeof window === 'undefined') return getInitialTelemetry();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const init = getInitialTelemetry();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialTelemetry();
  }
}

export function saveTelemetry(state: TelemetryState): void {
  if (typeof window === 'undefined') return;
  try {
    state.lastUpdated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    notifyListeners(state);
  } catch (err) {
    console.error('Failed to save telemetry:', err);
  }
}

// Asynchronously fetch latest aggregated telemetry from Vercel Serverless Function (/api/stats)
export async function fetchTelemetryAsync(): Promise<TelemetryState> {
  const local = getTelemetry();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('/api/stats', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const remoteData: TelemetryState = await res.json();
      // Ensure merged state preserves local latest updates
      const merged: TelemetryState = {
        ...local,
        ...remoteData,
        dataSource: remoteData.dataSource || 'vercel-kv',
        lastUpdated: Date.now(),
      };
      saveTelemetry(merged);
      return merged;
    }
  } catch (e) {
    // Graceful fallback to local cache
    console.log('Using local cached telemetry store');
  }
  return local;
}

// Non-blocking pulse delivery to Vercel Serverless Function (/api/track)
// and dual-dispatch to Vercel Web Analytics (window.va)
async function sendRemotePulse(payload: {
  type: string;
  path?: string;
  label?: string;
  meta?: Record<string, any>;
}): Promise<void> {
  if (typeof window === 'undefined') return;

  // 1. Dispatch to Vercel Web Analytics if initialized
  try {
    const va = (window as any).va;
    if (typeof va === 'function') {
      va('event', {
        name: payload.type,
        data: {
          path: payload.path,
          label: payload.label,
          ...payload.meta,
        },
      });
    }
  } catch {
    // Ignore Vercel client tracking errors
  }

  // 2. Dispatch to custom Redis telemetry endpoint
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Non-blocking failover
    });
  } catch {
    // Ignore offline errors
  }
}

export function recordPageView(path: string): void {
  const current = getTelemetry();
  current.totalPageviews += 1;
  current.pageviews[path] = (current.pageviews[path] || 0) + 1;

  const visitor = getVisitorId();
  if (visitor.isNew) {
    current.uniqueVisitors += 1;
  }

  const newEv: TelemetryEvent = {
    id: `ev-${Date.now()}`,
    type: 'pageview',
    label: `Visited ${path === '/' ? 'Home page' : path}`,
    path,
    timestamp: Date.now(),
    meta: {
      device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
      userAgent: navigator.userAgent.slice(0, 40),
      isNewVisitor: visitor.isNew,
    },
  };

  current.recentEvents = [newEv, ...current.recentEvents.slice(0, 19)];
  saveTelemetry(current);

  // Send to serverless API
  sendRemotePulse({
    type: 'pageview',
    path,
    label: newEv.label,
    meta: newEv.meta,
  });
}

export function recordResumeClick(source: 'sidebar' | 'info'): void {
  const current = getTelemetry();
  current.resumeClicks.total += 1;
  if (source === 'sidebar') current.resumeClicks.sidebar += 1;
  if (source === 'info') current.resumeClicks.infoPage += 1;

  const newEv: TelemetryEvent = {
    id: `ev-${Date.now()}`,
    type: 'resume',
    label: `Viewed Resume PDF (${source === 'sidebar' ? 'Sidebar' : 'Info Page'})`,
    path: source === 'sidebar' ? '/' : '/info',
    timestamp: Date.now(),
    meta: { source, target: 'Sanity Asset CDN' },
  };

  current.recentEvents = [newEv, ...current.recentEvents.slice(0, 19)];
  saveTelemetry(current);

  // Send to serverless API
  sendRemotePulse({
    type: 'resume',
    path: newEv.path,
    label: newEv.label,
    meta: newEv.meta,
  });
}

export function recordOutreachClick(channel: 'email' | 'phone' | 'linkedin' | 'github' | 'leetcode'): void {
  const current = getTelemetry();
  if (channel in current.outreachClicks) {
    current.outreachClicks[channel] += 1;
  }

  const newEv: TelemetryEvent = {
    id: `ev-${Date.now()}`,
    type: 'outreach',
    label: `Clicked ${channel.toUpperCase()} contact link`,
    timestamp: Date.now(),
    meta: { channel },
  };

  current.recentEvents = [newEv, ...current.recentEvents.slice(0, 19)];
  saveTelemetry(current);

  // Send to serverless API
  sendRemotePulse({
    type: 'outreach',
    label: newEv.label,
    meta: newEv.meta,
  });
}

export function resetTelemetry(): TelemetryState {
  const fresh = getInitialTelemetry();
  saveTelemetry(fresh);
  return fresh;
}

export function exportTelemetryJSON(): void {
  const data = getTelemetry();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-telemetry-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
