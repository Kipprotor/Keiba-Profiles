import {
  cheerio,
  createTableParser,
  RowData,
  TableParserFactory,
} from "../deps.ts";
import { RaceResult } from "../model.ts";

export { scrapeRaceResult };

const resultTableParser: TableParserFactory<RowData> = createTableParser<
  RowData
>();

function scrapeRaceResult(html: string): RaceResult[] {
  const $ = cheerio.load(html);

  const sel = 'table[class="db_h_race_results nk_tb_common"]';
  const selectedhtml = $(sel).parent().html();
  let tablehtml: string;
  const raceResults: RaceResult[] = [];

  if (selectedhtml == null) {
    throw new Error("tablehtml is empty, check the html if a table exists.");
  } else {
    tablehtml = selectedhtml!;
  }

  const tableIR = resultTableParser(tablehtml);
  // resultTableParser の返り値は関数で、その関数を実行することでテーブルのパース結果が得られる
  const tableData = tableIR().rows;

  for (const row of tableData) {
    const raceResult: RaceResult = {
      raceDate: row["日付"],
      held: row["開催"],
      weather: row["天気"],
      raceNumber: parseInt(row["r"]),
      name: row["レース名"],
      horseCnt: parseInt(row["頭数"]),
      starterNumber: parseInt(row["枠番"]),
      horseNumber: parseInt(row["馬番"]),
      odds: parseFloat(row["オッズ"]),
      popularity: parseFloat(row["人気"]),
      ranking: parseInt(row["着順"]),
      jockey: row["騎手"],
      carryWeight: parseFloat(row["斤量"]),
      dist: row["距離"],
      trackCond: row["馬場"],
      pace: row["ペース"],
      time: row["タイム"],
      winningMargin: row["着差"],
      cornerRanking: row["通過"],
      lastPhaseTime: parseFloat(row["上り"]),
      weight: row["馬体重"],
      prizeMoney: parseFloat(row["賞金"]),
    };
    raceResults.push(raceResult);
  }
  return raceResults;
}
