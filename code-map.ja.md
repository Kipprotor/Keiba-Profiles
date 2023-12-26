**FYI: HorseID とはnetkeiba での競走馬に割り振られた番号のこと**
https://db.netkeiba.com/horse/2017106711/ の2017106711の部分

## /src/net

**webサイトにアクセスし、スクレイピングを行うコードがあるフォルダ**

- crawler.ts
  - functions
    - generateURL({horseName,fathersName,motherName}) => string
    - encodeURIeucJP(str) => string
    - getSearchResulthtml(url) => netkeibaResponse
  - interface
    - netkeibaResponse = {url: string,body:string,unique:boolean}
- parser.ts
  - functions
    - parseSearchResult
      - 検索結果のページから、馬名 HorseID 生年の情報を抜き出す関数
    - parseProfPage(html) => horseProfile
      - netkeibaの競走馬の情報を載せているページから、情報を抜き出す関数
      - parseHorseInfo と parseRaceResult のラッパー
    - parseHorseInfo
    - parseRaceResult
  - interface

## /src

- index.ts
  - このモジュールからインポートできる関数を一度にエクスポートしている
  - ここで定義されている関数・定数はない。
- deps.ts
  - 利用しているモジュールのバージョン管理を簡単にするためのファイル
  - このモジュールで使っているすべてのモジュールをここでインポートしている。
- wrapper.ts
  - functions
    - lookupID(name)
      - 名前から HorseID を取得する関数
    - profileByName({name, year?, father?, mother?})
      - 競走馬の名前で検索して情報を取得する関数
      - 名前の指定は必須だが、オプション引数として、生年や、父馬と母馬の名前を指定できる。
      - 検索結果が1件以上だった場合、エラーを返す。
    - profileByID
      - HorseIDを使って情報を取得する関数
- model.ts
  - パースするときに使う正規表現などの定数や、パースした結果を代入する型を定義
  - 主に parser.ts が使用
  - interface
    - searchResult.ts
    - horseInfo.ts
      - parseHorseInfo が使用
    - raceResult.ts
      - parseRaceResult が使用

- test.ts
  - 動作テスト用

## /testLabo

- textDecodeEncoder.ts
  - crawler.ts で使用した encodeURIeucJP のテスト
  - 引数をURI形式にした EUC-JP の文字コードで返すスクリプト
