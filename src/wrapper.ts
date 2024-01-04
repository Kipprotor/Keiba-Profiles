import { accessByID, searchOnNetkeiba } from "./crawler.ts";
import { SearchResult } from "./model.ts";
import {
  horseInfo2SearchResult,
  scrapeHorseInfo,
  scrapeSearchResult,
} from "./scrape/scraper.ts";

export { lookupID, profileByID, profileByName };

async function lookupID(name: string): Promise<SearchResult[]> {
  const response = await searchOnNetkeiba({ horseName: name });
  let result: SearchResult[] = [];
  if (response.unique) {
    // 例: url = https://db.netkeiba.com/horse/2017106711/
    // scrapeHorseInfo(response.html) の返り値を上手く取り出して searchResult型に変換して返す。
    const horseInfo = scrapeHorseInfo(response.html);
    result = horseInfo2SearchResult(horseInfo);
  } else {
    result = scrapeSearchResult(response.html);
  }
  return result;
}

async function profileByName(name: string) {
  const res = await searchOnNetkeiba({ horseName: name });
  if (res.unique) {
    const result = scrapeHorseInfo(res.html);
    return result;
  }
}

async function profileByID(horseID: string) {
  const res = await accessByID(horseID);
  try {
    const result = scrapeHorseInfo(res.html);
    return result;
  } catch (error) {
    throw error;
  }
}
