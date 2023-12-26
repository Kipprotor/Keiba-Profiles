import { cheerio } from "../deps.ts";
import { searchResult } from "../model.ts";

function parseSearchResult(html: string): searchResult[] {
  const $ = cheerio.load(html);
  const rows: searchResult[] = [];
  // 検索結果のtable要素と、表の見出し以外のtr要素を選択
  const sel = 'table[class="nk_tb_common race_table_01"] tr[class!="txt_c"]';
  /* 表の形式は、以下の通り。
    行の1番目の内容とurlを取得、2,3,6,7番目の内容を取得する。
  表の見出し [
  "",  "馬名", "性",   "生年", "",      "厩舎",
  "父", "母",  "母父", "馬主", "生産者", "総賞金(万円)"
  ]
  html上での class [
  "",      "bml txt_l", "txt_c", "txt_c", "",      "txt_l",
  "txt_l", "txt_l",     "txt_l", "txt_l", "txt_l", "txt_r",
  ] */
  const searchResult = $(sel);
  searchResult.each((_, elements) => {
    // horse には horseID と馬名が入っている。
    const horse = $(elements).find("td[class$='txt_l']:first > a");

    // profUrl には undeifned が入る可能性があるので、ここで一旦代入
    // profUrlの値: profUrl = "/horse/${horseID}"
    const profUrl = horse.attr("href") || "";
    const horseName = horse.text();

    // txtCArrayの値: [性, 生年]
    const txtCArray = $(elements).find("td[class='txt_c']").map(
      (_, element) => $(element).text().replaceAll("\n", ""),
    ).get();

    // txtLArrayの値: [馬名, 厩舎, 父, 母, 母父, 馬主, 生産者, 総賞金(万円)]
    const txtLArray = $(elements).find("td[class$='txt_l']").map(
      (_, element) => $(element).text().replaceAll("\n", ""),
    ).get();

    const row: searchResult = {
      // sliceを使い horseID のみ取り出している。
      horseId: profUrl.slice(7, 17),
      horseName: horseName,
      sex: txtCArray[0],
      birthyear: parseInt(txtCArray[1]),
      fathersName: txtLArray[2],
      mothersName: txtLArray[3],
    };
    rows.push(row);
  });
  return rows;
}

//function parseProfPage(html: string): string {}

function parseHorseInfo(html: string): string[] {
  const $ = cheerio.load(html);

  // tableタグでクラス名が db_prof_table で始まる要素を取得
  const prof = $('table[class^="db_prof_table"]');

  // profからtdタグのテキストを取得
  const horseInfo: string[] = [];
  prof.find("td").each((_, element) => {
    const text = $(element).text().replaceAll("\n", "");
    horseInfo.push(text);
  });

  return horseInfo;
}

//function parseRaceResult(html: string): string[][] {}

export { parseHorseInfo, parseSearchResult };
