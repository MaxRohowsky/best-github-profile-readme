const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const data = JSON.parse(fs.readFileSync('docs/data.json', 'utf-8'));
    const browser = await puppeteer.launch();

    for (const profile of data) {
        const screenshotPath = path.join('docs', profile.screenshotPath);
        if (fs.existsSync(screenshotPath)) {
            console.log(`Screenshot already exists for ${profile.firstName} ${profile.lastName}, skipping.`);
            continue;
        }

        console.log(`Taking screenshot for ${profile.firstName} ${profile.lastName}...`);

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });
        await page.goto(profile.githubProfile);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await page.close();
    }

    await browser.close();
})();