import { searchOnNetkeiba, scrapeRaceResult } from "../src/index.ts";
import {
  createTableParser,
  RowData,
  TableParserFactory,
} from "../src/deps.ts";

const raceResultParser: TableParserFactory<RowData> = createTableParser<
  RowData
>();

const res = await searchOnNetkeiba({ horseName: "パンサラッサ" });
const raceResults = scrapeRaceResult(res.html);
/*
const $ = cheerio.load(res.html);
const sel = 'table[class="db_h_race_results nk_tb_common"]';
const raceResultTable = $(sel).parent().html();

const tableIR = raceResultParser(raceResultTable!);
const rows = tableIR().rows[0];

const raceResult: RaceResult = {
  raceDate: rows["日付"],
  held: rows["開催"],
  weather: rows["天気"],
  raceNumber: parseInt(rows["r"]),
  name: rows["レース名"],
  horseCnt: parseInt(rows["頭数"]),
  starterNumber: parseInt(rows["枠番"]),
  horseNumber: parseInt(rows["馬番"]),
  dist: rows["距離"],
  trackCond: rows["馬場"],
  pace: rows["ペース"],
  time: rows["タイム"],
  winningMargin: rows["着差"],
  cornerRanking: rows["通過"],
  lastPhaseTime: parseFloat(rows["上り"]),
  weight: rows["馬体重"],
  prizeMoney: parseFloat(rows["賞金"]),
};
*/
console.log(raceResults)