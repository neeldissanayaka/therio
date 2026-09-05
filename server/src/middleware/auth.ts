import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const COOKIE = 'rio_admin';
const secret = () => {
  const v = process.env.ADMIN_JWT_SECRET;
  if (!v || v.length < 32) return 'the-rio-super-secret-admin-jwt-key-2026-fallback-string-32-chars';
  return v;
};

export function setAdminCookie(res: Response, adminId: string) {
  const token = jwt.sign({ sub: adminId, role: 'admin' }, secret(), { expiresIn: '8h', issuer: 'the-rio' });
  res.cookie(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 8 * 60 * 60 * 1000, path: '/api' });
}

export function clearAdminCookie(res: Response) { res.clearCookie(COOKIE, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/api' }); }

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[COOKIE];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, secret(), { issuer: 'the-rio' }) as jwt.JwtPayload;
    if (payload.role !== 'admin' || typeof payload.sub !== 'string') return res.status(401).json({ error: 'Unauthorized' });
    res.locals.adminId = payload.sub;
    next();
  } catch { return res.status(401).json({ error: 'Unauthorized' }); }
}
