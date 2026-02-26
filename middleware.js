// Vercel Edge Middleware — IP-based rate limiting
// Runs on every incoming request before it reaches the static site

const WINDOW_MS = 60 * 1000;   // 1-minute sliding window
const MAX_REQUESTS = 100;       // max requests per IP per window

const rateMap = new Map();       // IP → { count, resetAt }

function cleanupStaleEntries(now) {
  if (rateMap.size > 10_000) {
    for (const [key, entry] of rateMap) {
      if (now > entry.resetAt) rateMap.delete(key);
    }
  }
}

export default function middleware(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const now = Date.now();
  cleanupStaleEntries(now);

  let entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + WINDOW_MS };
    rateMap.set(ip, entry);
  } else {
    entry.count++;
  }

  if (entry.count > MAX_REQUESTS) {
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'You have exceeded the rate limit. Please try again shortly.',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
          'X-RateLimit-Limit': String(MAX_REQUESTS),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(entry.resetAt / 1000)),
        },
      }
    );
  }

  // Let the request through — Vercel will serve the static asset / page
  return undefined;
}

export const config = {
  // Apply to all routes except Vercel internals and static assets
  matcher: ['/((?!_vercel|favicon.ico|assets/).*)'],
};
