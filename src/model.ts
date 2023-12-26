export type { Race, searchResult };

interface searchResult {
  horseName: string;
  horseId: string;
  sex: string;
  birthyear: number;
  fathersName: string;
  mothersName: string;
}

//interface horseProfile {}
interface Race {
  id: string; // 201509030811
  raceDate: Date;
  //参考 https://qiita.com/t-yama-3/items/29bd686f2a8b3cb9e784

  monthCnt: number; // 3
  course: string; // 阪神
  dayCnt: number; // 8

  wether: string; // wethers = ["晴", "曇", "雨", "小雨", "雪", "小雪"];

  raceNumber: number; // 11
  name: string; // 第56回宝塚記念(G1)
  raceGrade?: number; // 1

  horseCnt: number; // 出走馬数

  raceType: string; // raceType = ["芝", "ダ", "芝 ダート", "障"]
  dist: number; // 2200

  trackCond: string; // trackConds = ["良", "稍重", "重", "不良"]

  raceResult: RaceResult; //レース結果
}

interface RaceResult {
  starterNumber: number; //枠番
  horseNumber: number; //馬番

  odds: number | undefined; //単勝
  popularity: number | undefined; //人気

  ranking: number | string; //着順 number, "失", "中", "除", "取"

  age: number;

  jockey: string; //騎手
  carryWeight: number; //斤量

  time: number | undefined;
  margin: string; //着差
  cornerRanking: number[] | undefined; //通過
  lastPhaseTime: number | undefined; //上り

  weight: number | string; //馬体重 number, "計不"
  weightChange: number | string; //増加体重 number, "計不"
  prizeMoney: number; //賞金(万円)
}
