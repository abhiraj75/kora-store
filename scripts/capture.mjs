// Usage: node scripts/capture.mjs <url> <out.png>
// Prints the checkout total and saves a screenshot. Used for before/after proof.
import { chromium } from 'playwright';

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node scripts/capture.mjs <url> <out.png>');
  process.exit(2);
}
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 520, height: 560 } });
await page.goto(url);
await page.waitForSelector('#total:not(:empty)');
console.log(`TOTAL ${await page.textContent('#total')}`);
await page.screenshot({ path: out });
await browser.close();
