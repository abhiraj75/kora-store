import { test } from 'node:test';
import assert from 'node:assert/strict';
import { total } from '../src/cart.js';

test('SAVE10 subtracts 10% from the checkout subtotal', () => {
  const items = [
    { name: 'Handloom Kurta', price: 1200, qty: 1 },
    { name: 'Canvas Sneakers', price: 800, qty: 1 },
  ];

  assert.equal(total(items, 'SAVE10'), 1800);
});
