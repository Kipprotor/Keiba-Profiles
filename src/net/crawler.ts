import { iconv } from "../deps.ts";

function generateURL({
  horseName,
  fatherName = "",
  motherName = "",
}: {
  horseName: string;
  fatherName?: string;
  motherName?: string;
}): string {
  // 馬の名前 {horse,fathers,mothers}Name をそれぞれEUC-JP に変換
  const [encddHorseName, encddFatherName, encddMotherName] = [
    horseName,
    fatherName,
    motherName,
  ].map(encodeURIeucJP);

  // NetkeibaのURLを構築
  return `https://db.netkeiba.com/?pid=` +
    `horse_list&word=${encddHorseName}&match=1` +
    `&sire=${encddFatherName}` +
    `&mare=${encddMotherName}`;
}

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

interface netkeibaResponse {
  url: string;
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
    ResponseのbodyをArrayBufferとして取得、それをUint8Arrayに変換している。
    Uint8ArrayはBufferに相当する。
    */
    const nkResponse: netkeibaResponse = {
      url: response.url,
      body: iconv.decode(blob, "euc-jp"),
      unique: response.redirected,
    };
    return nkResponse;
  } catch (error) {
    console.error("Error during HTTP request:", error);
    throw error;
  }
}
export { generateURL, getSearchResultHtml };
