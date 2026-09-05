import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcryptjs';

const email = process.env.ADMIN_EMAIL || 'admin@therio.lk';
const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
if (password.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters');

const passwordHash = await bcrypt.hash(password, 12);
await prisma.adminUser.upsert({
  where: { email: email.toLowerCase() },
  update: { passwordHash },
  create: { email: email.toLowerCase(), passwordHash }
});
await prisma.$disconnect();
