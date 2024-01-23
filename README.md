<h1 aliagn="center">Keiba-Profile</h1>

### **db.netkeiba.com から競走馬の情報を取得するモジュール**

```typescript
const horseInfo = await profileByName({horseName:horseName})
console.log(horseInfo)
/* horseInfo: {
  horseId: string; //201710xxxx
  horseName: string;
  ...
  totalPrizeJRA: number; //単位は、万円
  totalPrizeNAR: number; 
  recode: string; //例: 28戦8勝 [8-6-0-15]
  pedgree: {
     fatherName: string;
     fFatherName: string;
     fMotherName: string;
     motherName: string;
     mFatherName: string;
     mMotherName: string;
*/
```

## 詳細情報
- <h3><a href="./docs-ja/about-api.md">API</a></h3>

- <h3><a href="./code-map.ja.md">コードのフォルダ構造や関数のあるファイルについての情報</a></h3>