import { searchInNetkeiba } from "../net/crawler.ts";
import { parseHorseInfo, parseSearchResult } from "../net/parser.ts";
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
  const response = await searchInNetkeiba({ horseName: horseName });
  //console.log(response);
  if (response.unique) {
    // HTMLから馬の情報を取得して、ターミナルに表示
    const horseInfo = parseHorseInfo(response.body);
    console.log("horseInfo ", horseInfo);
  } else {
    const rows = parseSearchResult(response.body);
    console.log(rows);
  }
} catch (error) {
  console.error("Error during processing:", error);
}
