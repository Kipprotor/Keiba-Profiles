import { scrapeSearchResult, searchOnNetkeiba } from "../src/index.ts";
import { SearchResult } from "../src/model.ts";

let result: SearchResult[] = [];

let i = 1;
while (true) {
  const res = await searchOnNetkeiba({ fatherName: "ゴールドシップ", page: i });
  console.log(`url: ${res.url}\nuniqueness: ${res.unique}\n`);

  const rows = scrapeSearchResult(res.html);
  if (rows.length > 0) {
    result = result.concat(rows);
    //console.log({rows})
    i++;
    await sleep(2000);
  } else {
    break;
  }
}

console.log(`result length: ${result.length}\n`, "Search result:\n", {
  result,
});

function sleep(ms: number): Promise<void> {
  // msミリ秒後に解決されるPromiseを返す
  return new Promise((resolve) => setTimeout(resolve, ms));
}
