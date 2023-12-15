import { default as iconv } from "npm:iconv-lite@0.6.3";
import * as cheerio from "npm:cheerio@1.0.0-rc.12";

function generateURL(horseName: string): string {
  // 馬の名前 horseName を EUC-JP に変換
  const eucjpBuffer = iconv.encode(horseName, "eucjp");

  // バイトを % で区切って連結
  const encodedName = Array.from(eucjpBuffer)
    .map((byte) => "%" + byte.toString(16).toUpperCase())
    .join("");

  // NetkeibaのURLを構築
  return `https://db.netkeiba.com/?pid=horse_list&word=${encodedName}`;
}
/*
function encodeURIeucJP(str: string): string {
  // 文字列を EUC-JP に変換
  //const eucjpBuffer = encode(str, 'eucjp');
  const eucjpBuffer = iconv.encode(str, "eucjp");
  // バイトを % で区切って連結
  const uriEncoded = Array.from(eucjpBuffer)
    .map((byte) => "%" + byte.toString(16).toUpperCase())
    .join("");

  return uriEncoded;
}
*/

interface netkeibaResponse {
  //url: string;
  body: string;
  unique: boolean;
}

async function getSearchResultHtml(url: string): Promise<netkeibaResponse> {
  try {
    const response = await fetch(url, { redirect: "follow" });
    //console.log(response);
    // 検索して見つかった馬が一答しかいなかった場合、response.redirected が ture となる。
    const blob = new Uint8Array(await response.arrayBuffer());
    /*
    ResponseのbodyをArrayBufferとして取得
    それをUint8Arrayに変換している。Uint8ArrayはBufferに相当する。
    */
    const nkResponse = {body: iconv.decode(blob, "euc-jp"),
                        unique: response.redirected
                       }
    return nkResponse;
  } catch (error) {
    console.error("Error during HTTP request:", error);
    throw error;
  }
}

function selectHorseInfo(html: string): string[] {
  const $ = cheerio.load(html);

  // tableタグでクラス名が db_prof_table で始まる要素を取得
  const prof = $('table[class^="db_prof_table"]');

  // profからtdタグのテキストを取得
  const horseInfo: string[] = [];
  prof.find("td").each((_, element) => {
    const text = $(element).text();
    horseInfo.push(text);
  });

  return horseInfo;
}

export { generateURL, getSearchResultHtml, selectHorseInfo };
