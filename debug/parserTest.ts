import { scrapeHorseInfo, searchOnNetkeiba } from "../src/index.ts";

const horse_html = await searchOnNetkeiba({ horseName: "パンサラッサ" });
const html = horse_html.html;
const horseInfo = scrapeHorseInfo(html);
console.log({ horseInfo });
