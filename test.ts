import { generateURL, getSearchResultHtml, selectHorseInfo } from "./src/lib.ts";

/*// コマンドライン引数から馬の名前を取得
const args: string[] = Deno.args;
const horseName = args[args.length-1];
*/
const horseName =  "ジュテミルフー"; //"シルヴァーソニック"; //"ゴールドシチー";

console.log(horseName);
// 馬の情報を取得して表示
try {
  // NetkeibaのURLを生成
  const url = generateURL(horseName);
  console.log(url);

  // HTMLを取得
  //const response = await fetch(url, {redirect: "follow"});
  const response= await getSearchResultHtml(url);
  //console.log(htmlDecoded)
  if (response.unique) {
  // HTMLから馬の情報を取得して、ターミナルに表示
    console.log("horseInfo ",selectHorseInfo(response.body));
  }
} catch (error) {
  console.error("Error during processing:", error);
}
