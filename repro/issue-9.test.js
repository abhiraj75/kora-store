import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const element = () => ({
  hidden: true,
  innerHTML: '',
  textContent: '',
  value: '',
  addEventListener() {},
});

test('a valid coupon shows its discount between Shipping and Total', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const shippingAt = html.indexOf('>Shipping<');
  const discountAt = html.indexOf('id="discount-row"');
  const totalAt = html.indexOf('>Total<');

  assert.ok(
    shippingAt < discountAt && discountAt < totalAt,
    'checkout should contain a discount row between Shipping and Total',
  );

  const ids = ['items', 'subtotal', 'shipping', 'discount-row', 'discount', 'coupon-status', 'total', 'coupon', 'apply'];
  const elements = new Map(ids.map((id) => [id, element()]));
  globalThis.document = { getElementById: (id) => elements.get(id) };
  globalThis.location = { search: '?coupon=SAVE10', pathname: '/' };
  globalThis.history = { replaceState() {} };

  await import(`../src/app.js?issue-9=${Date.now()}`);

  assert.equal(elements.get('discount-row').hidden, false);
  assert.equal(elements.get('discount').textContent, '−₹200.00');
});
