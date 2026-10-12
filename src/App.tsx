import { useEffect } from 'react';
import Lenis from 'lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TopNav } from './components/sections/TopNav';
import { Sidebar } from './components/sections/Sidebar';
import { RightSidebar } from './components/sections/RightSidebar';
import { ProjectGrid } from './components/sections/ProjectGrid';
import { WorkGrid } from './components/sections/WorkGrid';
import { ProjectDetailPage } from './components/sections/ProjectDetailPage';
import { InfoPage } from './components/sections/InfoPage';
import { SiteDashboard } from './components/sections/SiteDashboard';
import { recordPageView } from './lib/telemetry';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!pathname.includes('dashboard') && !pathname.includes('console') && !pathname.includes('telemetry')) {
      recordPageView(pathname);
    }
  }, [pathname]);
  return null;
}

// Automatically connects to Vercel Web Analytics & Speed Insights in production
function VercelObservability() {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
      // 1. Vercel Web Analytics script
      if (!document.querySelector('script[src*="_vercel/insights"]')) {
        const s1 = document.createElement('script');
        s1.src = '/_vercel/insights/script.js';
        s1.defer = true;
        document.head.appendChild(s1);
      }
      // 2. Vercel Speed Insights script
      if (!document.querySelector('script[src*="_vercel/speed-insights"]')) {
        const s2 = document.createElement('script');
        s2.src = '/_vercel/speed-insights/script.js';
        s2.defer = true;
        document.head.appendChild(s2);
      }
    }
  }, []);
  return null;
}

function HomePage() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.65fr_1fr] pt-11 min-h-screen">
      {/* Left Column (Sticky Sidebar) */}
      <div className="order-1 lg:order-1 lg:border-r border-brand-border min-w-0">
        <Sidebar />
      </div>
      
      {/* Center Column (Scrollable Content) */}
      <div className="order-3 lg:order-2 lg:border-r border-brand-border flex flex-col min-w-0">
        <ProjectGrid />
      </div>
      
      {/* Right Column (Sticky Profile) */}
      <div className="order-2 lg:order-3 min-w-0">
        <RightSidebar />
      </div>
    </div>
  );
}

function WorkPage() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.65fr_1fr] pt-11 min-h-screen">
      {/* Left Column (Empty) */}
      <div className="hidden lg:block lg:border-r border-brand-border min-w-0" />
      
      {/* Center Column (Work Grid) */}
      <div className="lg:border-r border-brand-border flex flex-col min-w-0">
        <WorkGrid />
      </div>
      
      {/* Right Column (Empty) */}
      <div className="hidden lg:block min-w-0" />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-text selection:text-brand-bg font-sans tracking-tight antialiased">
      <ScrollToTop />
      <VercelObservability />
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/secret-dashboard" element={<SiteDashboard />} />
        <Route path="/console" element={<SiteDashboard />} />
        <Route path="/telemetry" element={<SiteDashboard />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
