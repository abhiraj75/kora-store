# Issue #1 proof

## Before

- Reproduction: **FAIL** — got `200`, expected `1800`.
- Browser capture (`/?coupon=SAVE10`): `TOTAL ₹200.00`.
- See [`red.log`](./red.log).

## After

- Reproduction: **PASS** — got `1800`.
- Browser capture (`/?coupon=SAVE10`): `TOTAL ₹1,800.00`.
- Full suite: **PASS**, 8/8 tests.
- See [`green.log`](./green.log).
