import { subtotal, shipping, total, formatINR, COUPONS } from './cart.js';

const items = [
  { name: 'Handloom Kurta', price: 1200, qty: 1 },
  { name: 'Canvas Sneakers', price: 800, qty: 1 },
];

const $ = (id) => document.getElementById(id);

function render(code) {
  const sub = subtotal(items);
  const valid = Boolean(COUPONS[code]);
  $('items').innerHTML = items
    .map((i) => `<li><span>${i.name} × ${i.qty}</span><span>${formatINR(i.price * i.qty)}</span></li>`)
    .join('');
  $('subtotal').textContent = formatINR(sub);
  $('shipping').textContent = shipping(sub) === 0 ? 'Free' : formatINR(shipping(sub));
  $('coupon-status').textContent = code ? (valid ? `${code} applied` : `${code} is not a valid coupon`) : '';
  $('total').textContent = formatINR(total(items, valid ? code : undefined));
}

const params = new URLSearchParams(location.search);
const initial = (params.get('coupon') || '').trim().toUpperCase();
$('coupon').value = initial;
render(initial);

$('apply').addEventListener('click', () => {
  const code = $('coupon').value.trim().toUpperCase();
  history.replaceState(null, '', code ? `?coupon=${code}` : location.pathname);
  render(code);
});
