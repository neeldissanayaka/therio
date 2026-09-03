import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { clearAdminCookie, requireAdmin, setAdminCookie } from '../middleware/auth.js';

const router = Router();
const loginSchema = z.object({ email: z.string().email().max(254), password: z.string().min(12).max(200) });

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid credentials' });
  const admin = await prisma.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) return res.status(401).json({ error: 'Invalid credentials' });
  setAdminCookie(res, admin.id);
  res.json({ ok: true });
});

router.post('/logout', (_req, res) => { clearAdminCookie(res); res.json({ ok: true }); });
router.get('/me', requireAdmin, async (_req, res) => res.json({ ok: true }));
export default router;
