// Capturas de tela para revisão visual: node scripts/shots.mjs <url> <outDir> [mobile|desktop] [scrollYs...]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const [url = "http://localhost:3123", out = "./.shots", device = "mobile", ...ys] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
const vp = device === "mobile" ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { width: 1440, height: 900, deviceScaleFactor: 1 };
await page.setViewport(vp);
await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 3000));
const positions = ys.length ? ys : ["0"];
for (const y of positions) {
  const px = y.endsWith("vh") ? Math.round((parseFloat(y) / 100) * vp.height) : y.startsWith("#") ? y : parseInt(y, 10);
  await page.evaluate(async (target) => {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    } else window.scrollTo(0, target);
  }, px);
  await new Promise((r) => setTimeout(r, 1600));
  const name = `${device}-${String(y).replace(/[#/]/g, "")}.png`;
  await page.screenshot({ path: `${out}/${name}` });
  console.log("saved", name);
}
await browser.close();
