import { scrapeHorseTitle, scrapePedigree } from "../scrape/scraper.ts";
import { searchOnNetkeiba } from "../crawler.ts";

const horse_html = await searchOnNetkeiba({ horseName: "パンサラッサ" });
const html = horse_html.html;
const horseInfo = scrapePedigree(html);
const horseTitle = scrapeHorseTitle(html);
console.log({ horseTitle, horseInfo });
