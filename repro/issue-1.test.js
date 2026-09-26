import { test } from 'node:test';
import assert from 'node:assert/strict';
import { total } from '../src/cart.js';

const cart = [
  { name: 'Handloom Kurta', price: 1200, qty: 1 },
  { name: 'Canvas Sneakers', price: 800, qty: 1 },
];

test('SAVE10 subtracts 10% from the reported cart total', () => {
  assert.equal(total(cart, 'SAVE10'), 1800);
});
