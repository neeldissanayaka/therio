import type { Request, Response, NextFunction } from 'express';

export function sameOrigin(req: Request, res: Response, next: NextFunction) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  const origin = req.get('origin');
  const expected = process.env.PUBLIC_ORIGIN;
  if (expected && origin && origin !== expected) return res.status(403).json({ error: 'Origin rejected' });
  next();
}
