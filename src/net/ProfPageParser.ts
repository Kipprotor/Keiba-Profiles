import { cheerio } from "../deps.ts";
import { HorseInfo } from "../model.ts";

export { parseHorseInfo, parseHorseTitle, parseProfTable };

function parseHorseInfo(html: string): HorseInfo {
  const [horseName, horseEngName, regist, sex, coatColor] = parseHorseTitle(
    html,
  );
  const profTblRows = parseProfTable(html);

  const horseInfo: HorseInfo = {
    horseName: horseName,
    horseEngName: horseEngName,
    regist: regist,
    sex: sex,
    coatColor: coatColor,
    birthday: profTblRows[0],
    trainer: profTblRows[1],
    owner: profTblRows[2],
    breeder: profTblRows[3],
    totalPrize: profTblRows[6],
    recode: profTblRows[7],
    /*
    fathersName:
    mothersName:
    */
  };
  return horseInfo;
}

function parseHorseTitle(html: string): string[] {
  const $ = cheerio.load(html);
  const horseTitle = 'div[class="horse_title"]';
  const horseName = $(horseTitle).find("h1").text();
  const horseEngName = $(horseTitle).find("p[class='eng_name']").text()
    .replaceAll("\n", "");

  let regist: string, sexAge: string, sex: string, coatColor: string;
  // 変数を初期化
  regist =
    sexAge =
    sex =
    coatColor =
      "";

  const RegSexCoat = $(horseTitle)
    .find("p[class='txt_01']").text()
    .replace(" ", "").split("　");
  if (RegSexCoat.length == 3) {
    [regist, sexAge, coatColor] = RegSexCoat;
  } else if (RegSexCoat.length == 2) {
    [sexAge, coatColor] = RegSexCoat;
    regist = "";
  }
  sex = sexAge[0];

  return [horseName, horseEngName, regist, sex, coatColor];
}

function parseProfTable(html: string): string[] {
  const $ = cheerio.load(html);
  // tableタグでクラス名が db_prof_table で始まる要素を取得
  const prof = $('table[class^="db_prof_table"]');

  const profTblRows: string[] = [];
  const header: string[] = [
    "生年月日",
    "調教師",
    "馬主",
    //"募集情報",
    "生産者",
    "産地",
    "セリ取引価格",
    "獲得賞金",
    "通算成績",
  ];

  // db_prof_table のから情報を取得
  for (const head of header) {
    profTblRows.push(
      prof.find(`th:contains(${head})`)
        .parent().find("td").text().replaceAll("\n", ""),
    );
  }
  return profTblRows;
}
/*
function parsePedigree(html: string): string[] {
  const $ = cheerio.load(html);
  const pedTable = $('table[class="blood_table"]');

}
function parseRaceResult(html: string): RaceResult[][] {}
*/
