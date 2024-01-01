import { searchOnNetkeiba } from "../crawler.ts";
import { scrapeHorseInfo, scrapeSearchResult } from "../scrape/scraper.ts";
//import { lookupID } from "./wrapper.ts";

//const horseName = "エクスカリバー";
const horseName = "シルヴァーソニック";
//"エクスカリバー";
//const fathersName = "su";
//const mothersName = "mr";
console.log(horseName);
/*
const result = await lookupID(horseName);
console.log(result);
*/

try {
  // HTMLを取得
  const response = await searchOnNetkeiba({ horseName: horseName });
  //console.log(response);
  if (response.unique) {
    // HTMLから馬の情報を取得して、ターミナルに表示
    const horseInfo = scrapeHorseInfo(response.html);
    console.log("horseInfo ", horseInfo);
  } else {
    const rows = scrapeSearchResult(response.html);
    console.log(rows);
  }
} catch (error) {
  console.error("Error during processing:", error);
}
