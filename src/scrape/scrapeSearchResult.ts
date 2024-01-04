import { cheerio } from "../deps.ts";
import { HorseInfo, SearchResult } from "../model.ts";

export { horseInfo2SearchResult, scrapeSearchResult };

/**
 * Scrape search result page
 * @param {string} html : HTML string of search result page
 * @returns {SearchResult[]} Array of searchResult type
 */
function scrapeSearchResult(html: string): SearchResult[] {
  const $ = cheerio.load(html);
  const rows: SearchResult[] = [];
  // 検索結果のtable要素と、表の見出し以外のtr要素を選択
  const sel = 'table[class="nk_tb_common race_table_01"] tr[class!="txt_c"]';
  /* 表の形式は、以下の通り。
  行の1番目の内容とurlを取得、2,3,6,7番目の内容を取得する。
  表の見出し [
  "",  "馬名", "性",   "生年", "",      "厩舎",
  "父", "母",  "母父", "馬主", "生産者", "総賞金(万円)"]
  html上での class [
  "",      "bml txt_l", "txt_c", "txt_c", "",      "txt_l",
  "txt_l", "txt_l",     "txt_l", "txt_l", "txt_l", "txt_r",]
  */
  const searchResult = $(sel);
  searchResult.each((_, elements) => {
    // horse には horseID と馬名が入っている。
    const horse = $(elements).find("td[class$='txt_l']:first > a");

    // profUrlの値: profUrl = "/horse/${horseID}"
    const profUrl = horse.attr("href") || "";
    const horseName = horse.text();

    // txtCArrayの値: [性, 生年]
    const [sex, birthyear] = $(elements).find("td[class='txt_c']").map(
      (_, element) => $(element).text().replaceAll("\n", ""),
    ).get();

    // txtLArrayの値: [馬名, 厩舎, 父, 母, 母父, 馬主, 生産者, 総賞金(万円)]
    const txtLArray = $(elements).find("td[class$='txt_l']").map(
      (_, element) => $(element).text().replaceAll("\n", ""),
    ).get();

    const row: SearchResult = {
      // sliceを使い horseID のみ取り出している。
      horseId: profUrl.slice(7, 17),
      horseName: horseName,
      sex: sex,
      birthyear: parseInt(birthyear),
      fatherName: txtLArray[2],
      motherName: txtLArray[3],
    };
    rows.push(row);
  });
  return rows;
}

/**
 * Convert horseInfo type to SearchResult type
 * @param {HorseInfo} horseInfo : HorseInfo type return from scrapeHorseInfo
 * @returns {SearchResult} [singleSearchResult] : SearchResult type
 */
function horseInfo2SearchResult(horseInfo: HorseInfo): SearchResult[] {
  const birthyear = parseInt(horseInfo.birthday.slice(0, 4));
  const fatherName = horseInfo.pedgree.fatherName;
  const motherName = horseInfo.pedgree.motherName;
  const singleSearchResult: SearchResult = {
    horseId: horseInfo.horseId,
    horseName: horseInfo.horseName,
    sex: horseInfo.sex,
    birthyear,
    fatherName,
    motherName,
  };
  return [singleSearchResult];
}
