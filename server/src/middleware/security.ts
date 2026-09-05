import type { Request, Response, NextFunction } from 'express';

// Validates origins and referrers to prevent Cross-Site Request Forgery (CSRF) on state-modifying requests
export function sameOrigin(req: Request, res: Response, next: NextFunction) {
  // Allow safe idempotent read methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  // Payment webhooks from PayHere are signed by MD5 and handled separately
  if (req.path === '/payhere/notify' || req.path === '/api/payments/payhere/notify') {
    return next();
  }

  const origin = req.get('origin');
  const referer = req.get('referer');
  const expected = process.env.PUBLIC_ORIGIN;

  if (expected) {
    // If strict PUBLIC_ORIGIN is specified, ensure incoming origin or referer matches
    if (origin && origin !== expected) {
      return res.status(403).json({ error: 'Origin verification failed' });
    }
    if (!origin && referer) {
      try {
        const refUrl = new URL(referer);
        const expUrl = new URL(expected);
        if (refUrl.host !== expUrl.host) {
          return res.status(403).json({ error: 'Referer origin rejected' });
        }
      } catch {
        return res.status(403).json({ error: 'Invalid referer format' });
      }
    }
  }

  // Anti-Bot: Require a valid User-Agent for POST/PATCH/DELETE API requests
  const userAgent = req.get('user-agent');
  if (!userAgent || userAgent.trim().length === 0) {
    return res.status(400).json({ error: 'Client identification header missing' });
  }

  next();
}

// Anti-Scraping / Search Engine Indexing Control for API and private dashboards
export function apiSecurityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
}
