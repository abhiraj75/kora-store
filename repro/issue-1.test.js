import { test } from 'node:test';
import assert from 'node:assert/strict';
import { total } from '../src/cart.js';

test('SAVE10 deducts 10% from the reported ₹2,000 cart', () => {
  const cart = [
    { name: 'Handloom Kurta', price: 1200, qty: 1 },
    { name: 'Canvas Sneakers', price: 800, qty: 1 },
  ];

  assert.equal(total(cart, 'SAVE10'), 1800);
});
