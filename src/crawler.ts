import { iconv } from "./deps.ts";

export { generateURL, searchOnNetkeiba };

interface searchQuery {
  horseName: string;
  fatherName?: string;
  motherName?: string;
}

interface netkeibaResponse {
  url: string;
  html: string;
  unique: boolean;
}

async function searchOnNetkeiba(
  options: searchQuery,
): Promise<netkeibaResponse> {
  const url = generateURL(options);
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
      html: iconv.decode(blob, "euc-jp"),
      unique: response.redirected,
    };
    return nkResponse;
  } catch (error) {
    console.error("Error during HTTP request:", error);
    throw error;
  }
}

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
    `&mare=${encddMotherName}`;
}

function encodeURIeucJP(str: string | undefined): string {
  if (str === undefined) {
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
