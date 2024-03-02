import { iconv } from "./deps.ts";
import { NetkeibaResponse, searchQuery } from "./model.ts";
export { fetchByID, fetchHtml, generateURL, searchOnNetkeiba };

/**
 * generateURL returns searching URL
 * @param {searchQuery} query {horseName fatherName? motherName?}
 * @returns {string} url
 */
function generateURL(query: searchQuery): string {
  // 馬の名前 {horse,fathers,mothers}Name をそれぞれEUC-JP に変換
  const [encddHorseName, encddFatherName, encddMotherName] = [
    query.horseName,
    query.fatherName,
    query.motherName,
  ].map(encodeURIeucJP);

  // NetkeibaのURLを構築
  return `https://db.netkeiba.com/?pid=` +
    `horse_list&word=${encddHorseName}&match=1` +
    `&sire=${encddFatherName}` +
    `&mare=${encddMotherName}` +
    `&page=${query.page || 1}` +
    `&list=100`;
}

/**
 * fetchHtml
 * @param {string} url
 * @returns {Promise<NetkeibaResponse>}
 */
async function fetchHtml(url: string): Promise<NetkeibaResponse> {
  const response = await fetch(url, { redirect: "follow" });
  //console.log(response);
  /*
  ResponseのbodyをArrayBufferとして取得、それをUint8Arrayに変換している。
  Uint8ArrayはBufferに相当する。
  */
  const blob = new Uint8Array(await response.arrayBuffer());
  // 検索して見つかった馬が一答しかいなかった場合、response.redirected が ture となる。
  const nkResponse = {
    url: response.url,
    html: iconv.decode(blob, "euc-jp"),
    unique: response.redirected,
  };
  return nkResponse;
}



/**
 * searchOnNetkeiba
 * @param {searchQuery} options {horseName? fatherName? motherName? page?}
 * @returns {Promise<netkeibaResponse>}
 * netkeibaResponse {url html unique}
 */
async function searchOnNetkeiba(
  options: searchQuery,
): Promise<NetkeibaResponse> {
  const url = generateURL(options);
  return await fetchHtml(url);
}

/**
 * fetchByID fetchess the page of the horse by the horseId.
 * @throws {Error} if the horseId is invalid.
 * @param {string} horseID
 * @return {Promise<NetkeibaPesponse>} url, html and uniqueness( Is response redirected?) in response.
 */
async function fetchByID(horseID: string): Promise<NetkeibaResponse> {
  const url = `https://db.netkeiba.com/horse/${horseID}/`;
  const res = await fetchHtml(url);
  if (res.url != url) {
      throw new Error("You may have entered the wrong horseID or none exists.")
  } 
  const nkResponse = {
    url: res.url,
    html: res.html,
    unique: true,
  };
  return nkResponse;
}

function encodeURIeucJP(str: string | undefined): string {
  if (str == undefined) {
    return "";
  }
  // 文字列を EUC-JP に変換
  //const eucjpBuffer = encode(str, 'eucjp');
  const eucjpBuffer = iconv.encode(str, "eucjp");
  // バイトを % で区切って連結
  const uriEncoded = Array.from(eucjpBuffer)
    .map((byte) => "%" + (byte as number).toString(16).toUpperCase())
    .join("");

  return uriEncoded;
}
