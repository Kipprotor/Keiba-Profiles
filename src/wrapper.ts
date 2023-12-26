import { generateURL, getSearchResultHtml } from "./net/crawler.ts";
import { parseSearchResult } from "./net/parser.ts";

async function lookupID(name: string): Promise<string[]> {
  const url = generateURL({ horseName: name });
  const response = await getSearchResultHtml(url);
  let result: string[] = [];
  if (response.unique) {
    // 例: url = https://db.netkeiba.com/horse/2017106711/
    const horseId = response.url.slice(response.url.lastIndexOf("/") + 1, -10);
    result = [horseId];
  } else {
    result = parseSearchResult(response.body).map((row) => row.horseId);
  }
  return result;
}

export { lookupID };
