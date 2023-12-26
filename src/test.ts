import { generateURL, getSearchResultHtml } from "./net/crawler.ts";
import { parseHorseInfo, parseSearchResult } from "./net/parser.ts";
//import { lookupID } from "./wrapper.ts";
/*// コマンドライン引数から馬の名前を取得
const args: string[] = Deno.args;
const horseName = args[args.length-1];
*/
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
  // NetkeibaのURLを生成
  const url = generateURL({
    horseName: horseName,
    //fathersName: fathersName,
    //mothersName: mothersName,
  });
  console.log(url);
  //const response = await fetch(url, {redirect: "follow"});
  // HTMLを取得
  const response = await getSearchResultHtml(url);
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
