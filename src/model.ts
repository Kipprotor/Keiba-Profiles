export type {
  HorseInfo,
  HorseProfile,
  NetkeibaResponse,
  Pedgree,
  RaceResult,
  searchQuery,
  SearchResult,
};
/*
export される配列、辞書
`./scrape/scrapeRaceResult.ts` でのみ使用される
rowsDict: { [key: string]: string }
targetRowsStringType: string[]
targertRowsNumberType: string[]
*/

interface searchQuery {
  horseName?: string;
  fatherName?: string;
  motherName?: string;
  page?: number;
}

interface NetkeibaResponse {
  url: string;
  html: string;
  unique: boolean;
}

interface SearchResult {
  horseId: string;
  horseName: string;
  sex: string;
  birthyear: number;
  fatherName: string;
  motherName: string;
}

interface HorseProfile {
  horseInfo: HorseInfo;
  raceResult: RaceResult[];
}

interface HorseInfo {
  horseId: string;
  horseName: string;
  horseEngName?: string;
  regist: string;
  sex: string;

  coatColor: string;
  birthday: string; //Date;
  trainer: string;
  owner: string;
  breeder: string;
  totalPrizeJRA: number;
  totalPrizeNAR: number;
  recode: string;
  pedgree: Pedgree;
}

interface Pedgree {
  fatherName: string;
  fFatherName: string;
  fMotherName: string;
  motherName: string;
  mFatherName: string;
  mMotherName: string;
}

/*
type RaceResult {
  [k in keyof InterfaceRaceResult]: string | number;
}
*/

interface RaceResult {
  //id: string; // 201509030811
  raceDate: string; // 日付

  held: string; // 開催: 3阪神8
  /*
  monthCnt: number; // 3
  course: string; // 阪神
  dayCnt: number; // 8
  */

  weather: string; // wethers = ["晴", "曇", "雨", "小雨", "雪", "小雪"];

  raceNumber: number; // 11
  name: string; //レース名: eg. 第56回宝塚記念(G1)
  //raceGrade?: number; // 1

  horseCnt: number; // 出走馬数
  starterNumber: number; //枠番
  horseNumber: number; //馬番

  odds: number | undefined; //単勝
  popularity: number | undefined; //人気
  ranking: number | string; //着順 number, "失", "中", "除", "取"

  jockey: string; //騎手
  carryWeight: number; //斤量

  dist: string; // 芝2200
  /*
  raceType: string; // raceType = ["芝", "ダ", "芝 ダート", "障"]
  dist: number; // 2200
  */
  trackCond: string; // trackConds = ["良", "稍重", "重", "不良"]

  time: string | undefined; // タイム
  winningMargin: string; //number; //着差
  cornerRanking: string | undefined; //通過
  pace: string; //ペース
  lastPhaseTime: number | undefined; //上り

  weight: number | string; //馬体重 number, "計不"
  //weightChange: number | string; //増加体重 number, "計不"
  prizeMoney: number; //賞金(万円)
}

/*
netkeiba上での表の見出しとraceResultのキーの対応
  日付: raceDate,
  開催: held,

  //「開催」についてあとから以下の3つに分ける
  //何ヶ月目: monthCnt
  //場所: course
  //何日目: dayCnt


  天気: weather,

  r: raceNumber,
  レース名: name,
  //レースのクラス:raceGrade?

  頭数: horseCnt,
  枠番: starterNumber,
  馬番: horseNumber,

  オッズ: odds,
  人気: popularity,
  着順: ranking,

  騎手: jockey,
  斤量: carryWeight,

  距離(コースと距離): dist,
  //コース: courseType
  //距離: dist
  馬場: trackCond,
  ペース: pace,
  タイム: time,
  着差: winningMargin,
  通過: cornerRanking,
  上り: lastPhaseTime,

  馬体重: weight,
  //体重の変化: weightChange

  賞金: prizeMoney,
*/
