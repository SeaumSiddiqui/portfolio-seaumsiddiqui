// Vercel Serverless Function: POST /api/track
// Ingests real-time events and pipelines them into Vercel KV (Redis)

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    const { type = 'pageview', path = '/', label, meta = {} } = body;
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (kvUrl && kvToken) {
      const commands: any[] = [];

      if (type === 'pageview') {
        commands.push(['INCR', 'telemetry:totalPageviews']);
        if (path) {
          commands.push(['HINCRBY', 'telemetry:pageviews', path, 1]);
        }
        // Unique visitor check if flag present in meta
        if (meta?.isNewVisitor) {
          commands.push(['INCR', 'telemetry:uniqueVisitors']);
        }
      } else if (type === 'resume') {
        commands.push(['INCR', 'telemetry:resumeTotal']);
        const sourceField = meta?.source === 'sidebar' ? 'sidebar' : 'infoPage';
        commands.push(['HINCRBY', 'telemetry:resumeClicks', sourceField, 1]);
      } else if (type === 'outreach') {
        if (meta?.channel) {
          commands.push(['HINCRBY', 'telemetry:outreachClicks', meta.channel, 1]);
        }
      }

      // Record audit event in recent events list (max 30 retained)
      const eventRecord = JSON.stringify({
        id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type,
        label: label || `Event: ${type}`,
        path,
        timestamp: Date.now(),
        meta,
      });

      commands.push(['LPUSH', 'telemetry:recentEvents', eventRecord]);
      commands.push(['LTRIM', 'telemetry:recentEvents', 0, 29]);

      // Execute pipeline against Vercel KV REST API
      const response = await fetch(`${kvUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commands),
      });

      if (!response.ok) {
        console.warn('Vercel KV pipeline status:', response.status);
      }

      return res.status(200).json({ ok: true, source: 'vercel-kv' });
    }

    return res.status(200).json({ ok: true, source: 'in-memory-local' });
  } catch (error: any) {
    console.error('Track handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}
