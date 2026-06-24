const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Intercept Next.js data if possible, or just parse HTML
  await page.goto('https://www.fotmob.com/teams/8321/squad/mexico', { waitUntil: 'domcontentloaded' });
  
  const content = await page.content();
  console.log("HTML length:", content.length);
  
  // try finding Next data
  const match = content.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
  if (match) {
     console.log("Found NEXT DATA");
  } else {
     console.log("No NEXT DATA found");
  }
  
  await browser.close();
}

run().catch(console.error);
