import { default as iconv } from "npm:iconv-lite@0.6.3";
/*
// 文字列を EUC-JP にエンコード
const encodedBuffer = iconv.encode(inputString, 'euc-jp');
// EUC-JP をデコード
const decodedString = iconv.decode(encodedBuffer, 'euc-jp');

console.log('Encoded:', encodedBuffer);
console.log('Decoded:', decodedString);
console.log(typeof(encodedBuffer));
*/

// 文字列をEUC-JP で URI エンコードする関数
function encodeURIeucJP(str: string): string {
  // 文字列を EUC-JP に変換
  const eucjpBuffer = iconv.encode(str, "euc-jp");
  Array.from(eucjpBuffer)
    .map((byte) => console.log("typof(byte)", typeof byte));

  // バイトを % で区切って連結
  const uriEncoded = Array.from(eucjpBuffer)
    .map((byte) => "%" + (byte as number).toString(16).toUpperCase())
    .join("");

  //console.log(uriEncoded);
  return uriEncoded;
}

// process.argv でコマンドライン引数を取得 slice(2) で最初の２つを削除
//const inputString: string[] = Deno.args;
//console.log(inputString)
const inputString = "こんにちは";
for (const item of inputString) {
  const encodedString = encodeURIeucJP(item);
  console.log(`Original String: ${item}\nEncoded String ${encodedString}`);
  const buf = iconv.encode(item, "euc-jp");
  console.log(buf);
}
