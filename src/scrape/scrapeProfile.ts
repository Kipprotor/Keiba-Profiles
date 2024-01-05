import { cheerio } from "../deps.ts";
import { HorseInfo, Pedgree } from "../model.ts";

export { scrapeHorseInfo, scrapeHorseTitle, scrapePedigree, scrapeProfTable };

/*
function scrapeProfile(html: string): HorseProfile {}
*/

function scrapeHorseInfo(html: string): HorseInfo {
  const [horseId, horseName, horseEngName, regist, sex, coatColor] =
    scrapeHorseTitle(
      html,
    );
  const profTblRows = scrapeProfTable(html);
  const [prizeJRA, prizeNAU] = extractPrize(profTblRows[6]);
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
    totalPrizeJRA: prizeJRA,
    totalPrizeNAR: prizeNAU,
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
  //const birthday = profTblRows[0];
  //profTblRows[0] = parse(birthday, "yyyy年MM月dd日", new Date(), { locale: ja });
  return profTblRows;
}

function extractPrize(prize: string): number[] {
  const prizeArray = prize.replaceAll(" ", "").split("/");
  let prizeJRA = 0;
  let prizeNAU = 0";

  for (const prize of prizeArray) {
    if (prize.includes("中央")) {
      prizeJRA = prizeNormalizer(prize);
    } else if (prize.includes("地方")) {
      prizeNAU = prizeNormalizer(prize);
    }
  }
  return [prizeJRA, prizeNAU];
}

function prizeNormalizer(prize: string): number {
  const regex = /[億万]/;
  const pSplited = prize.split(regex);
  if (pSplited.length == 3) {
    const result = parseInt(pSplited[0])*10**4 + parseInt(pSplited[1])
    return result
  } else {
   return parseInt(pSplited[0])   
  }
}

function scrapePedigree(html: string): Pedgree {
  const $ = cheerio.load(html);
  const [
    fatherName,
    fFatherName,
    fMotherName,
    motherName,
    mFatherName,
    mMotherName,
  ] = $('table[class="blood_table"]').find("td").map(
    (_, element) => $(element).text().replaceAll("\n", ""),
  ).get();

  // pedgree に分割代入
  const pedgree: Pedgree = {
    fatherName,
    fFatherName,
    fMotherName,
    motherName,
    mFatherName,
    mMotherName,
  };

  return pedgree;
}
