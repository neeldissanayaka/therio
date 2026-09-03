import { Router } from 'express';
import crypto from 'node:crypto';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { ADDONS, calculateTotal, PACKAGES, SLOTS } from '../lib/catalog.js';
import { createCheckoutHash, payhereAction } from '../lib/payhere.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
const IDEMPOTENCY = /^[-A-Za-z0-9_]{8,100}$/;
const createSchema = z.object({
  packageId: z.enum(['movie', 'ps5']), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), slotId: z.enum(['slot-1','slot-2','slot-3','slot-4']),
  guests: z.number().int().min(1).max(6), addonIds: z.array(z.string()).max(4), specialNote: z.string().max(500).optional(),
  firstName: z.string().trim().min(1).max(80), lastName: z.string().trim().min(1).max(80), email: z.string().email().max(254), phone: z.string().trim().min(7).max(30)
});

router.post('/', async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid booking details' });
  const data = parsed.data;
  const idempotencyKey = req.get('Idempotency-Key');
  if (!idempotencyKey || !IDEMPOTENCY.test(idempotencyKey)) return res.status(400).json({ error: 'Idempotency-Key is required' });
  const pkg = PACKAGES[data.packageId];
  if (data.guests < pkg.paxIncluded) return res.status(400).json({ error: 'Invalid guest count' });
  if (data.addonIds.some(id => !(id in ADDONS))) return res.status(400).json({ error: 'Invalid add-on' });
  const bookingDate = new Date(`${data.date}T00:00:00.000Z`);
  if (Number.isNaN(bookingDate.getTime()) || bookingDate < new Date(new Date().toISOString().slice(0,10) + 'T00:00:00.000Z')) return res.status(400).json({ error: 'Invalid date' });

  const prior = await prisma.booking.findUnique({ where: { idempotencyKey } });
  if (prior) return res.status(200).json({ bookingRef: prior.publicRef, totalLkr: prior.totalLkr, status: prior.status });
  await prisma.booking.updateMany({ where: { status: 'PENDING_PAYMENT', paymentExpiresAt: { lt: new Date() } }, data: { status: 'CANCELLED', activeSlotKey: null } });

  const existing = await prisma.booking.findUnique({ where: { activeSlotKey: `${data.date}:${data.slotId}` } });
  if (existing) return res.status(409).json({ error: 'That time slot is already booked' });

  const total = calculateTotal(data.packageId, data.guests, data.addonIds);
  const publicRef = `RIO-${crypto.randomBytes(16).toString('hex').toUpperCase()}`;
  try {
    const booking = await prisma.booking.create({ data: { publicRef, idempotencyKey, packageId: pkg.id, packageTitle: pkg.title, bookingDate, slotId: data.slotId, slotLabel: SLOTS[data.slotId].label, activeSlotKey: `${data.date}:${data.slotId}`, paymentExpiresAt: new Date(Date.now() + 15 * 60 * 1000), guests: data.guests, addonIds: data.addonIds, specialNote: data.specialNote, firstName: data.firstName, lastName: data.lastName, email: data.email.toLowerCase(), phone: data.phone, totalLkr: total, currency: 'LKR' } });
    return res.status(201).json({ bookingRef: booking.publicRef, totalLkr: total, status: booking.status });
  } catch (error: any) {
    if (error?.code === 'P2002') return res.status(409).json({ error: 'That time slot is already booked' });
    throw error;
  }
});

router.post('/:ref/checkout', async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { publicRef: req.params.ref } });
  if (!booking || booking.status !== 'PENDING_PAYMENT' || (booking.paymentExpiresAt && booking.paymentExpiresAt < new Date())) return res.status(404).json({ error: 'Booking not payable or payment window expired' });
  const merchantId = process.env.PAYHERE_MERCHANT_ID; const secret = process.env.PAYHERE_MERCHANT_SECRET; const origin = process.env.PUBLIC_ORIGIN;
  if (!merchantId || !secret || !origin) return res.status(503).json({ error: 'Payment gateway is not configured' });
  const payment = await prisma.payment.upsert({ where: { bookingId: booking.id }, update: {}, create: { bookingId: booking.id, amount: booking.totalLkr, currency: booking.currency } });
  const hash = createCheckoutHash(merchantId, booking.publicRef, booking.totalLkr, booking.currency, secret);
  res.json({ action: payhereAction, fields: { merchant_id: merchantId, return_url: `${origin}/payment.html?booking=${booking.publicRef}&result=success`, cancel_url: `${origin}/payment.html?booking=${booking.publicRef}&result=cancelled`, notify_url: `${origin}/api/payments/payhere/notify`, first_name: booking.firstName, last_name: booking.lastName, email: booking.email, phone: booking.phone, address: 'The Rio Cinema', city: 'Colombo', country: 'Sri Lanka', order_id: booking.publicRef, items: booking.packageTitle, currency: booking.currency, amount: booking.totalLkr.toFixed(2), hash, custom_1: payment.id } });
});

router.get('/:ref', async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { publicRef: req.params.ref }, select: { publicRef:true, packageTitle:true, packageId:true, bookingDate:true, slotLabel:true, guests:true, addonIds:true, totalLkr:true, currency:true, status:true, payment:{select:{status:true}} } });
  if (!booking) return res.status(404).json({ error: 'Not found' });
  res.json(booking);
});

router.get('/', requireAdmin, async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1); const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize) || 20));
  const [items, total] = await prisma.$transaction([prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, skip: (page-1)*pageSize, take: pageSize, include: { payment: true } }), prisma.booking.count()]);
  res.json({ items, page, pageSize, total });
});

router.patch('/:ref/status', requireAdmin, async (req, res) => {
  const parsed = z.object({ status: z.enum(['PENDING_PAYMENT','PAID','PAYMENT_FAILED','CANCELLED','COMPLETED']) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid status' });
  const booking = await prisma.booking.update({ where: { publicRef: req.params.ref }, data: { status: parsed.data.status, activeSlotKey: parsed.data.status === 'CANCELLED' ? null : undefined } });
  res.json({ ok: true, booking });
});

export default router;
