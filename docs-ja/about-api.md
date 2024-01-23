### API 一覧

**注: コードで query という変数を使っていた場合以下の書き方に従う。なお、fatherName と motherName の指定は必須ではない**
```typescript
query = {horseName:horseName,fatherName:fatherName,motherName:motherName}
```

#### wrapper ‐ 短いコードで情報を収集できます。
**lookupID**
```typescript
const result = lookupID(query);
// result: searchResult[]
```

**profileByName**
```typescript
const result = profileByName(query)
// result: HorseInfo
```

**profileByID**
```typescript
const result = profileByID("201710xxxx")
// result: HorseInfo
```

#### htmlを取得
**searchOnNetkeiba**
```typescript
const res = await searchOnNetkeiba(query);
/* response: NetkeibaResponse = {
  url: string,
  html: string,
  unique: boolean,
    unique が True の場合 db.netkeiba.com/horse/ 以下のページにリダイレクト
    False の場合 検索結果ページにアクセスしたことを示す。             
}*/
```

**accessByID**
```typescript
const res = await accesssByID(horseID);
/* res: NetkeibaRespponse
searchOnNetkeiba と同じ
*/
```

#### db.netkeiba.com の html をスクレイピングし、情報を抜き出す関数
**scrapeHorseInfo**
```typescript
// html は res.html が代入することを想定している。ただし、別の方法で取得した html でも可能。
const horseInfo = scrapeHorseInfo(html);
```

**scrapeHorseTitle**
```typescript
const horseTitle = scrapeHorseInfo(html);
/* horseTitle:string[] = [
  horseId, horseName, horseEngName, 
  regist, sex, coatColor];
*/
```

**scrapePedigree**
```typescript
const pedgree = scrapePedgree(html);
/* pedgree: Pedgree = {
    fatherName,
    fFatherName,
    fMotherName,
    motherName,
    mFatherName,
    mMotherName,
    }
*/
```
**scrapeProfTable**
```typescript
const profTbl = scrapeProfTable(html;
/* profTbl:string[] = [
    "生年月日",
    "調教師",
    "馬主",
    "生産者",
    "産地",
    "セリ取引価格",
    "獲得賞金",
    "通算成績",
]*/
```

**scrapeSearchResult**
```typescript
const rows = scrapeSearchResult(html);
/* rows: SearchResult[] = [
  {
  horseId: string;
  horseName: string;
  sex: string;
  birthyear: number;
  fatherName: string;
  motherName: string;
  },{
  horseId: string;
  ...
  },{
  ...
]
*/
```