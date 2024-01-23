export type {
  HorseInfo,
  HorseProfile,
  NetkeibaResponse,
  Pedgree,
  RaceResult,
  searchQuery,
  SearchResult,
};

interface searchQuery {
  horseName: string;
  fatherName?: string;
  motherName?: string;
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

interface RaceResult {
  id: string; // 201509030811
  raceDate: Date;

  monthCnt: number; // 3
  course: string; // 阪神
  dayCnt: number; // 8

  wether: string; // wethers = ["晴", "曇", "雨", "小雨", "雪", "小雪"];

  raceNumber: number; // 11
  name: string; //レース名: eg. 第56回宝塚記念(G1)
  raceGrade?: number; // 1

  horseCnt: number; // 出走馬数
  starterNumber: number; //枠番
  horseNumber: number; //馬番

  odds: number | undefined; //単勝
  popularity: number | undefined; //人気
  ranking: number | string; //着順 number, "失", "中", "除", "取"

  jockey: string; //騎手
  carryWeight: number; //斤量

  raceType: string; // raceType = ["芝", "ダ", "芝 ダート", "障"]
  dist: number; // 2200
  trackCond: string; // trackConds = ["良", "稍重", "重", "不良"]

  time: Date | undefined;
  margin: string; //着差
  cornerRanking: number[] | undefined; //通過
  lastPhaseTime: number | undefined; //上り

  weight: number | string; //馬体重 number, "計不"
  weightChange: number | string; //増加体重 number, "計不"
  prizeMoney: number; //賞金(万円)
}
