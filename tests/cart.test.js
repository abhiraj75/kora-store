// Existing regression suite. RedHanded may NOT modify anything in tests/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { subtotal, shipping, total, formatINR, round2 } from '../src/cart.js';

const bigCart = [
  { name: 'Handloom Kurta', price: 1200, qty: 1 },
  { name: 'Canvas Sneakers', price: 800, qty: 1 },
];
const smallCart = [{ name: 'Tote Bag', price: 500, qty: 2 }];

test('subtotal sums price times quantity', () => {
  assert.equal(subtotal(bigCart), 2000);
  assert.equal(subtotal(smallCart), 1000);
});

test('shipping is free at or above ₹1,500', () => {
  assert.equal(shipping(1500), 0);
  assert.equal(shipping(2000), 0);
});

test('shipping is ₹99 below ₹1,500', () => {
  assert.equal(shipping(1000), 99);
});

test('total without a coupon is subtotal plus shipping', () => {
  assert.equal(total(bigCart), 2000);
  assert.equal(total(smallCart), 1099);
});

test('an unknown coupon changes nothing', () => {
  assert.equal(total(bigCart, 'NOTACODE'), 2000);
});

test('round2 rounds to paise', () => {
  assert.equal(round2(799.199), 799.2);
});

test('formatINR uses the rupee symbol and Indian grouping', () => {
  assert.match(formatINR(200000), /₹\s?2,00,000/);
});
