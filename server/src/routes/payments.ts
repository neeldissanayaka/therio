import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { verifyNotification } from '../lib/payhere.js';

const router = Router();
router.post('/payhere/notify', async (req, res) => {
  const secret = process.env.PAYHERE_MERCHANT_SECRET;
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  if (!secret || !merchantId) return res.status(503).send('Not configured');
  const p = Object.fromEntries(Object.entries(req.body).map(([k,v]) => [k, String(v)]));
  if (p.merchant_id !== merchantId || !p.order_id || !p.md5sig) return res.status(400).send('Invalid notification');
  try {
    if (!verifyNotification(p, secret)) return res.status(400).send('Invalid signature');
  } catch { return res.status(400).send('Invalid signature'); }
  const statusCode = Number(p.status_code);
  const booking = await prisma.booking.findUnique({ where: { publicRef: p.order_id }, include: { payment: true } });
  if (!booking) return res.status(404).send('Booking not found');
  if (Math.round(Number(p.payhere_amount) * 100) !== booking.totalLkr * 100 || p.payhere_currency !== booking.currency) return res.status(400).send('Amount mismatch');

  const status = statusCode === 2 ? 'SUCCESS' : statusCode === 0 ? 'PENDING' : statusCode === -1 ? 'CANCELLED' : statusCode === -3 ? 'CHARGEDBACK' : 'FAILED';
  await prisma.$transaction(async tx => {
    await tx.payment.upsert({ where: { bookingId: booking.id }, update: { payhereId: p.payment_id || undefined, amount: booking.totalLkr, currency: booking.currency, status, method: p.method, statusMessage: p.status_message, rawStatus: statusCode }, create: { bookingId: booking.id, payhereId: p.payment_id || undefined, amount: booking.totalLkr, currency: booking.currency, status, method: p.method, statusMessage: p.status_message, rawStatus: statusCode } });
    await tx.booking.update({ where: { id: booking.id }, data: { status: status === 'SUCCESS' ? 'PAID' : status === 'CHARGEDBACK' ? 'PAYMENT_FAILED' : status === 'FAILED' ? 'PAYMENT_FAILED' : status === 'CANCELLED' ? 'CANCELLED' : 'PENDING_PAYMENT', activeSlotKey: status === 'CANCELLED' ? null : undefined } });
  });
  res.send('OK');
});
export default router;
