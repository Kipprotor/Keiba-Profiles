import { searchOnNetkeiba } from "../src/index.ts";
import { cheerio } from "../src/deps.ts";

const res = await searchOnNetkeiba({ horseName: "パンサラッサ" });
const $ = cheerio.load(res.html);
const sel = 'table[class="db_h_race_results nk_tb_common"] > tbody';
const resultTable = $(sel);
console.log(resultTable);
