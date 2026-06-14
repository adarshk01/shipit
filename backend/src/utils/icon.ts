import axios from "axios";
import * as cheerio from "cheerio";

export async function getIcon(url: string) {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const icon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href");

  if (!icon) return `${url}/favicon.ico`;
  try {
    return icon.startsWith("http") ? icon : new URL(icon, url).href;
  } catch (e) {
    console.error("Invalid URL:", { icon, url });
    return null;
  }
}
