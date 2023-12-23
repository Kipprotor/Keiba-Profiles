import {
  generateURL,
  getSearchResultHtml,
  parseSearchResult,
  selectHorseInfo,
} from "./src/lib.ts";

/*// コマンドライン引数から馬の名前を取得
const args: string[] = Deno.args;
const horseName = args[args.length-1];
*/
const horseName = "ミスターシービー"; //"ジュテミルフー";"シルヴァーソニック";

console.log(horseName);
// 馬の情報を取得して表示
try {
  // NetkeibaのURLを生成
  const url = generateURL(horseName);
  console.log(url);

  //const response = await fetch(url, {redirect: "follow"});
  // HTMLを取得
  const response = await getSearchResultHtml(url);
  //console.log(response);
  if (response.unique) {
    // HTMLから馬の情報を取得して、ターミナルに表示
    console.log("horseInfo ", selectHorseInfo(response.body));
  } else {
    const rows = parseSearchResult(response.body);
    console.log(rows);
  }
} catch (error) {
  console.error("Error during processing:", error);
}
