// Pricing logic for the demo storefront. All amounts are in rupees.

export const COUPONS = {
  SAVE10: 0.10,
  SAVE20: 0.20,
};

export const FREE_SHIPPING_THRESHOLD = 1500;
export const SHIPPING_FEE = 99;

export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function shipping(amount) {
  return amount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

// Returns the amount after the coupon is applied.
export function applyCoupon(amount, code) {
  const rate = COUPONS[code];
  if (!rate) return amount;
  return amount * rate;
}

export function total(items, code) {
  const sub = subtotal(items);
  return round2(applyCoupon(sub, code) + shipping(sub));
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}

export function formatINR(n) {
  return n.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
}
