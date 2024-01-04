import { searchOnNetkeiba, scrapeHorseTitle, scrapePedigree } from "../src/index.ts";

const horse_html = await searchOnNetkeiba({ horseName: "パンサラッサ" });
const html = horse_html.html;
const horseInfo = scrapePedigree(html);
const horseTitle = scrapeHorseTitle(html);
console.log({ horseTitle, horseInfo });
