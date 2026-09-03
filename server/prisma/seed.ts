import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
if (password.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters');

const passwordHash = await bcrypt.hash(password, 12);
await prisma.adminUser.upsert({
  where: { email: email.toLowerCase() },
  update: { passwordHash },
  create: { email: email.toLowerCase(), passwordHash }
});
await prisma.$disconnect();
