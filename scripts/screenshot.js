const puppeteer = require('puppeteer');
const fs = require('fs');

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://example.com');

  // Take screenshots
  await page.screenshot({ path: 'docs/images/example.png' });

  await browser.close();
}

takeScreenshots();