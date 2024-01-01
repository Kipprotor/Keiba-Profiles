import { searchOnNetkeiba } from "./crawler.ts";
import { scrapeSearchResult } from "./scrape/scraper.ts";
//import { SearchResult } from "./model.ts";

export { lookupID };

async function lookupID(name: string): Promise<string[]> {
  const response = await searchOnNetkeiba({ horseName: name });
  let result: string[] = [];
  if (response.unique) {
    // 例: url = https://db.netkeiba.com/horse/2017106711/
    // scrapeHorseInfo(response.html) の返り値を上手く取り出して searchResult型に変換して返す。
    const horseId = response.url.slice(response.url.lastIndexOf("/") + 1, -10);
    result = [horseId];
  } else {
    result = scrapeSearchResult(response.html).map((row) => row.horseId);
  }
  return result;
}
