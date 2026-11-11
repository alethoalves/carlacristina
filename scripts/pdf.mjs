// Gera os PDFs a partir das páginas /cv usando o Chrome instalado.
// Uso: com o site rodando (npm run dev ou npm start):  BASE_URL=http://localhost:3000 npm run pdf
// Opcional: PREVIEW_DIR=./.preview gera PNGs de cada folha para revisão.
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PREVIEW = process.env.PREVIEW_DIR;

const jobs = [
  { path: "/cv", out: "public/carla-felipe-curriculo.pdf", title: "Currículo — Carla C. Felipe" },
  { path: "/cv/vendas", out: "public/carla-felipe-curriculo-vendas.pdf", title: "Currículo (Vendas) — Carla C. Felipe" },
  { path: "/cv/gestao", out: "public/carla-felipe-curriculo-gestao.pdf", title: "Currículo (Gestão) — Carla C. Felipe" },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  for (const job of jobs) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 1400, deviceScaleFactor: 2 });
    await page.goto(BASE + job.path, { waitUntil: "networkidle0", timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))),
    );
    if (PREVIEW) {
      mkdirSync(PREVIEW, { recursive: true });
      const sheets = await page.$$(".sheet");
      for (let i = 0; i < sheets.length; i++) {
        const name = `${PREVIEW}/${job.path.replace(/\//g, "-").replace(/^-/, "") || "home"}-${i + 1}.png`;
        await sheets[i].screenshot({ path: name });
        console.log("preview", name);
      }
    }
    await page.emulateMediaType("print");
    await page.pdf({
      path: resolve(job.out),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log("pdf", job.out);
    await page.close();
  }
} finally {
  await browser.close();
}
