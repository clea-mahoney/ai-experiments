// Opens dist/index.html in a hidden Chrome and reports what a viewer would see.
// Lets an AI that can't see the screen check its own work. Usage: npm run check
// Optional: node scripts/check.mjs 2,26,32  (seconds at which to look)
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const page_url = "file://" + resolve("dist/index.html");
const moments = (process.argv[2] || "2,26,32").split(",").map(Number);
mkdirSync("check", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const problems = [];
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1320, height: 800 });
  page.on("pageerror", (err) => problems.push("Page error: " + err.message));
  page.on("console", async (msg) => {
    if (msg.type() !== "error") return;
    // Turn error objects into their real message instead of "JSHandle@error".
    const parts = await Promise.all(msg.args().map((arg) =>
      arg.evaluate((v) => (v instanceof Error ? v.message : String(v))).catch(() => msg.text())));
    problems.push("Console error: " + (parts.join(" ") || msg.text()).slice(0, 400));
  });
  await page.goto(page_url, { waitUntil: "load" });
  const start = Date.now();
  for (const seconds of moments) {
    const wait = seconds * 1000 - (Date.now() - start);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim());
    const shot = `check/at-${seconds}s.png`;
    await page.screenshot({ path: shot });
    console.log(`At ${seconds}s, the page shows: ${text || "(nothing; the page is blank)"}`);
    console.log(`  Screenshot: ${shot}`);
  }
} finally {
  await browser.close();
}
if (problems.length) {
  console.log("\nPROBLEMS FOUND. The page is broken. Fix these before asking Clea:");
  for (const p of [...new Set(problems)]) console.log("- " + p);
  process.exit(1);
}
console.log("\nNo page errors. Read the text above to confirm it shows what the step expects.");
