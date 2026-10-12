import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Telemetry Dev Plugin: Handles /api/track and /api/stats during local development (Vite dev server)
function telemetryDevPlugin(): Plugin {
  const inMemoryEvents: any[] = [];
  const inMemoryPageviews: Record<string, number> = {
    '/': 2410,
    '/info': 1180,
    '/work': 890,
    '/work/devscope': 214,
    '/work/everbloom-bd': 142,
    '/work/hookchef-api': 56,
  };
  let totalPageviews = 4892;
  let uniqueVisitors = 1284;
  let resumeSidebar = 88;
  let resumeInfo = 54;
  const outreachClicks: Record<string, number> = {
    email: 76,
    phone: 24,
    linkedin: 189,
    github: 312,
    leetcode: 94,
  };

  return {
    name: 'telemetry-dev-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';

        // GET /api/stats
        if (url.startsWith('/api/stats') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              totalPageviews,
              uniqueVisitors: uniqueVisitors + Math.floor(inMemoryEvents.length / 3),
              activeSessions: 1,
              pageviews: inMemoryPageviews,
              resumeClicks: {
                total: resumeSidebar + resumeInfo,
                sidebar: resumeSidebar,
                infoPage: resumeInfo,
              },
              outreachClicks,
              dailyViews: [
                { day: 'Mon', views: 340, date: 'Oct 6' },
                { day: 'Tue', views: 420, date: 'Oct 7' },
                { day: 'Wed', views: 512, date: 'Oct 8' },
                { day: 'Thu', views: 480, date: 'Oct 9' },
                { day: 'Fri', views: 610, date: 'Oct 10' },
                { day: 'Sat', views: 530, date: 'Oct 11' },
                { day: 'Sun', views: 490 + inMemoryEvents.length, date: 'Oct 12' },
              ],
              recentEvents: inMemoryEvents.slice(0, 20),
              devices: { mobile: 62, desktop: 34, tablet: 4 },
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
              dataSource: 'local-dev-server',
              lastUpdated: Date.now(),
            })
          );
          return;
        }

        // POST /api/track
        if (url.startsWith('/api/track') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              if (data.type === 'pageview') {
                totalPageviews += 1;
                const p = data.path || '/';
                inMemoryPageviews[p] = (inMemoryPageviews[p] || 0) + 1;
                if (data.meta?.isNewVisitor) uniqueVisitors += 1;
              } else if (data.type === 'resume') {
                if (data.meta?.source === 'sidebar') resumeSidebar += 1;
                else resumeInfo += 1;
              } else if (data.type === 'outreach') {
                if (data.meta?.channel && data.meta.channel in outreachClicks) {
                  outreachClicks[data.meta.channel] += 1;
                }
              }

              inMemoryEvents.unshift({
                id: `ev-${Date.now()}`,
                type: data.type || 'pageview',
                label: data.label || `Event: ${data.type}`,
                path: data.path,
                timestamp: Date.now(),
                meta: data.meta,
              });
              if (inMemoryEvents.length > 50) inMemoryEvents.pop();

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, source: 'local-dev-server' }));
            } catch (err: any) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), telemetryDevPlugin()],
})
