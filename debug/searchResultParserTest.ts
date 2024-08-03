import {
  scrapeHorseInfo,
  scrapeSearchResult,
  searchOnNetkeiba,
} from "../src/index.ts";

//const horseNames = ["エクスカリバー", "パンサラッサ", "オヌシナニモノ"];
// const fathersName = "su";
// const mothersName = "mr";
/*
const result = await lookupID(horseName);
console.log(result);
*/
// HTMLを取得
const response = await searchOnNetkeiba({ fatherName: "フジキセキ", page: 1 });
//console.log(response);
if (response.unique) {
  // HTMLから馬の情報を取得して、ターミナルに表示
  const horseInfo = scrapeHorseInfo(response.html);
  console.log({ horseInfo });
} else {
  const rows = scrapeSearchResult(response.html);
  console.log({ rows });
}
