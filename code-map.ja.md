## /src/net

**webサイトにアクセスし、スクレイピングを行うコードがあるフォルダ**

- crawler.ts
- parser.ts
  - functions
    - parseSearchResult
      - 検索結果のページから、馬名 HorseID 生年の情報を抜き出す関数
    - parseProfPage
      - netkeibaの競走馬の情報を載せているページから、情報を抜き出す関数
      - parseHorseInfo と parseRaceResult を一箇所から使えるようにした関数
    - parseHorseInfo
    - parseRaceResult

## /src/model

**パースするときに使う正規表現などの定数や、パースした結果を代入する型を定義している。**

- searchResult.ts
- horseInfo.ts
  - parser.ts の parseHorseInfo が使用
- raceResult.ts
  - parser.ts の parseRaceResult が使用

## /src

- index.ts
  - このモジュールからインポートできる関数を一度にエクスポートしている
  - ここで定義されている関数・定数はない。
- deps.ts
  - 利用しているモジュールのバージョン管理を簡単にするためのファイル
  - このモジュールで使っているすべてのモジュールをここでインポートしている。
- wrapper.ts

**FYI: HorseID とはnetkeiba での競走馬に割り振られた番号のこと**
https://db.netkeiba.com/horse/2017106711/ の2017106711の部分

- functions
  - lookupID(name)
    - 名前から HorseID を取得する関数
  - profileByName({name, year?, father?, mother?})
    - 競走馬の名前で検索して情報を取得する関数
    - 名前の指定は必須だが、オプション引数として、生年や、父馬と母馬の名前を指定できる。
    - 検索結果が1件以上だった場合、エラーを返す。
  - profileByID
    - HorseIDを使って情報を取得する関数
    -
- test.ts
  - 動作テスト用
