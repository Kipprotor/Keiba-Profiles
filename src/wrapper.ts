import { searchInNetkeiba } from "./net/crawler.ts";
import { parseSearchResult } from "./net/parser.ts";
//import { SearchResult } from "./model.ts";

export { lookupID };

async function lookupID(name: string): Promise<string[]> {
  const response = await searchInNetkeiba({ horseName: name });
  let result: string[] = [];
  if (response.unique) {
    // 例: url = https://db.netkeiba.com/horse/2017106711/
    // parseHorseInfo(response.body) の返り値を上手く取り出して searchResult型に変換して返す。
    const horseId = response.url.slice(response.url.lastIndexOf("/") + 1, -10);
    result = [horseId];
  } else {
    result = parseSearchResult(response.body).map((row) => row.horseId);
  }
  return result;
}
