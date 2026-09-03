import crypto from 'node:crypto';

export const payhereAction = process.env.PAYHERE_SANDBOX === 'true'
  ? 'https://sandbox.payhere.lk/pay/checkout'
  : 'https://www.payhere.lk/pay/checkout';

function md5(value: string) {
  return crypto.createHash('md5').update(value, 'utf8').digest('hex').toUpperCase();
}

export function createCheckoutHash(merchantId: string, orderId: string, amount: number, currency: string, secret: string) {
  return md5(merchantId + orderId + amount.toFixed(2) + currency + md5(secret));
}

export function verifyNotification(params: Record<string, string>, secret: string) {
  const expected = md5(
    params.merchant_id + params.order_id + params.payhere_amount + params.payhere_currency + params.status_code + md5(secret)
  );
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from((params.md5sig ?? '').toUpperCase()));
}
