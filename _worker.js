// noinspection JSUnresolvedReference

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/ip') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const cf = request.cf || {};
      const city = cf.city || '';
      const region = cf.region || '';
      const country = cf.country || '';

      const parts = [city, region, country].filter(Boolean);
      const location = parts.length > 0 ? parts.join(', ') : 'unknown';

      return new Response(JSON.stringify({ ip, location }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};