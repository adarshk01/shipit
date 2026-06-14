import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";

export const fetchSS = async (url: string, path: string) => {
  const ssPath = `${process.env.LOCAL_OUTPUT_BASE}${path}/screenshot-${path}.png`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const buffer = (await page.screenshot({
      fullPage: false,
    })) as Buffer;

    await fs.writeFileSync(ssPath, buffer);
    return { success: true, path: ssPath, buffer };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  } finally {
    await browser.close();
  }
};
