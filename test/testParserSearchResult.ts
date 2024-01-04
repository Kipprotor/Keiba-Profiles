import {
  searchOnNetkeiba,
  scrapeHorseInfo,
  scrapeSearchResult,
} from "../src/index.ts";

const horseNames = ["エクスカリバー", "シルヴァーソニック", "パンサラッサ"];
//const fathersName = "su";
//const mothersName = "mr";
/*
const result = await lookupID(horseName);
console.log(result);
*/
for (const horseName of horseNames) {
  try {
    // HTMLを取得
    const response = await searchOnNetkeiba({ horseName: horseName });
    //console.log(response);
    if (response.unique) {
      // HTMLから馬の情報を取得して、ターミナルに表示
      const horseInfo = scrapeHorseInfo(response.html);
      console.log({horseName, horseInfo});
    } else {
      const rows = scrapeSearchResult(response.html);
      console.log({horseName, rows});
    }
  } catch (error) {
    console.error("Error during processing:", error);
  }
}
