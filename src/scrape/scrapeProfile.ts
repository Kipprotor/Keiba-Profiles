import { cheerio } from "../deps.ts";
import { HorseInfo, Pedgree } from "../model.ts";

export { scrapeHorseInfo, scrapeHorseTitle, scrapePedigree, scrapeProfTable };

function scrapeHorseInfo(html: string): HorseInfo {
  const [horseId, horseName, horseEngName, regist, sex, coatColor] =
    scrapeHorseTitle(
      html,
    );
  const profTblRows = scrapeProfTable(html);
  const pedgree = scrapePedigree(html);

  const horseInfo: HorseInfo = {
    horseId: horseId,
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
    pedgree: pedgree,
  };
  return horseInfo;
}

function scrapeHorseTitle(html: string): string[] {
  const $ = cheerio.load(html);
  const horseId = $("link[rel='canonical']").attr("href")?.split("/")[4] || "";
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

  return [horseId, horseName, horseEngName, regist, sex, coatColor];
}

function scrapeProfTable(html: string): string[] {
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

function scrapePedigree(html: string): Pedgree {
  const $ = cheerio.load(html);
  const pedgreeArray = $('table[class="blood_table"]').find("td").map(
    (_, element) => $(element).text().replaceAll("\n", ""),
  ).get();
  const pedgree: Pedgree = {
    fatherName: pedgreeArray[0],
    fFatherName: pedgreeArray[1],
    fMotherName: pedgreeArray[2],
    motherName: pedgreeArray[3],
    mFatherName: pedgreeArray[4],
    mMotherName: pedgreeArray[5],
  };
  return pedgree;
}
