**FYI: HorseID とはnetkeiba での競走馬に割り振られた番号のこと**
https://db.netkeiba.com/horse/2017106711/ の2017106711の部分

## /src/scrape

**htmlのスクレイピングを行うコードがあるフォルダ**

- scraper.ts
  - export
    - horseInfo2SeachResult
    - scrapeHorseInfo
    - scrapeHorseTitle
    - scrapePedigree
    - scrapeProfTable
    - scrapeSearchResult
- ~~parse~~ scrapeSearchResult.ts
  - functions
    - ~~parse~~ scrapeSearchResult(html)
      - 検索結果のページから、馬名 HorseID 生年の情報を抜き出す関数
    - horseInfo2SearchResult
      - HorseInfo型をSearchResult型に変換する関数
      - lookupIDが使用
- ~~parse~~ scrapeProfile.ts
  - functions
    - ~~parse~~ scrapeProfPage(html) => horseProfile
      - netkeibaの競走馬の情報を載せているページから、情報を抜き出す関数
      - scrapeHorseInfo と scrapeRaceResult のラッパー
    - ~~parse~~ scrapeHorseInfo
    - extractPrizeString(string) => number[]
      - 以下のような文字列を組織ごとの賞金に分けて配列で返す関数。
      - input: "4170万円 (中央) / 3400万円 (地方)"
      - output: [prizeJRA,prizeNAU] = [4170,3400]
    - ~~parse~~ scrapeHorseTitle
    - ~~parse~~ scrapeProfTable
    - extractPrize
      - "8,435万円 (中央) /1,208万円 (地方)" などの文字列を、[8435,1208] という数値の入った配列に変換する関数。
      - 内部で prizeNormalier を使用
    - prizeNormalizer
      - "3億170万円(中央)"という数値から 30170 という数値に変換する関数
    - ~~parse~~ scrapePedigree
      - 'table[class="blood_table"]' から、[父,父の父,父の母,母,母の父,母の母] の名前を取り出す関数
- ~~parse~~ scrapeRaceResult.ts
  - ~~parse~~ scrapeRaceResult
## /src

- index.ts
  - このモジュールからインポートできる関数を一度にエクスポートしている
  - ここで定義されている関数・定数はない。
- deps.ts
  - 利用しているモジュールのバージョン管理を簡単にするためのファイル
  - このモジュールで使っているすべてのモジュールをここでインポートしている。
- crawler.ts
  - functions
    - generateURL({horseName,fathersName,motherName}) => string
    - encodeURIeucJP(str) => string
    - searchInNetkeiba(url) => netkeibaResponse
  - interface
    - netkeibaResponse = {url: string,body:string,unique:boolean}
- wrapper.ts
  - functions
    - lookupID(quety:searchQuery) => SearchResult[]
      - 名前から HorseID を取得する関数
      - 変更完了 ~~1件しかヒットしなかった場合(競走馬のプロフィールページにリダイレクトされた場合)の処理が完成したら返り値を searchResult に変更する。~~
    - profileByName(query:searchQuery ~~{name, year?, father?, mother?}~~) => HorseInfo ~~HorseInfo~~
      - 競走馬の名前で検索して情報を取得する関数
      - 名前の指定は必須だが、オプション引数として、生年や、父馬と母馬の名前を指定できる。
      - 検索結果が2件以上だった場合、現在(2024/01/05)は undefined を返す。~~エラーを返す。~~
    - profileByID(horseId:string) => HorseInfo ~~HorseProfile~~
      - HorseIDを使って情報を取得する関数
- model.ts
  - パースするときに使う正規表現などの定数や、パースした結果を代入する型を定義
  - 主に scraper.ts が使用
  - interface
    - searchQuery
      - {horseName,fatherName?,motherName?}
    - SearchResult
      - scrapeSearchResultが使用
    - HorseProfile
      - HorseInfo と RaceResult を格納
    - HorseInfo
      - scrapeHorseInfo が使用
    - RaceResult
      - scrapeRaceResult が使用

## /test
- 動作テスト用

## /debugLabo

- textDecodeEncoder.ts
  - crawler.ts で使用した encodeURIeucJP のテスト
  - 引数をURI形式にした EUC-JP の文字コードで返すスクリプト
- cheerioList.ts
  - cheerio がリスト形式で a要素やhref要素を取得できるかテストしたもの
- moduleTest-parseHtmlTable.ts
  - parser.ts で table 要素を処理するときに複雑な処理を書く代わりに npm:parse-html-table を使うべきかテストするときに使用
  - このテストには合格したものの、実際に parser.ts に使った場合、何をしているのか却って分かりづらくなってしまったので npm:parse-html-table は不採用