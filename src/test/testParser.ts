import { parseHorseInfo } from "../net/parser.ts";
import { searchInNetkeiba } from "../net/crawler.ts";

const horse_html = await searchInNetkeiba({ horseName: "パンサラッサ" });
const horseInfo = parseHorseInfo(horse_html.body);
console.log({ horseInfo });
