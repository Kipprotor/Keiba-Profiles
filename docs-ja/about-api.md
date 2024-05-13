## API 一覧

**注: コードで query という変数を使っていた場合以下の書き方に従う。なお、fatherName と motherName の指定は必須ではない。また、pageは検索結果ページの何ページ目かを指定するもので、基本的には指定する必要はない。**
```typescript
query = {horseName:horseName,fatherName:fatherName,motherName:motherName,page:num}
```

### wrapper ‐ 短いコードで情報を収集できます。
- **lookupID** (非推奨)
```typescript
const result = lookupID(query);
// result: searchResult[]
```
- **lookupIDGenerator**

lookupID の AsyncGenerator版
```typescript
const data = lookupIDGenerator(query)
let page = 1
while (true) {
  const result = await data.next()
  console.log(result);
  if (result.done) {
    break;
  }
  await sleep(3000);
}

```

- **profileByName**:

名前で競走馬の情報を検索することができる。query で指定された競走馬が一つに定まらないときはエラーが発生する。
```typescript
const result = profileByName(query)
// result: HorseInfo
```


- **profileByID**:

正しくない、または、存在しない horseID を指定するとエラーが発生する。
```typescript
const horseID = "201710xxxx";
const result = profileByID(horseID);
// result: HorseInfo
```

### htmlを取得する関数
‐ **searchOnNetkeiba**
```typescript
const res = await searchOnNetkeiba(query);
/*
  page で検索結果の何ページ目を取得するかを指定できる。
  page はオプション扱いなので指定しなくてもよい。
*/
/* response: NetkeibaResponse = {
  url: string,
  html: string,
  unique: boolean,
    unique が True の場合 db.netkeiba.com/horse/ 以下のページにリダイレクト
    False の場合 検索結果ページにアクセスしたことを示す。             
}*/
```

- **fetchByID**:

正しくない、または、存在しない horseID を指定するとエラーが発生する。
```typescript
const res = await fetchsByID(horseID);
/* res: NetkeibaRespponse
searchOnNetkeiba と同じ
*/
```

### db.netkeiba.com の html をスクレイピングし、情報を抜き出す関数
- **scrapeHorseInfo**
```typescript
// html は res.html が代入することを想定している。ただし、別の方法で取得した html でも可能。
const horseInfo = scrapeHorseInfo(html);
```

- **scrapeHorseTitle**
```typescript
const horseTitle = scrapeHorseInfo(html);
/* horseTitle:string[] = [
  horseId, horseName, horseEngName, 
  regist, sex, coatColor];
*/
```

- **scrapePedigree**
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
- **scrapeProfTable**
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