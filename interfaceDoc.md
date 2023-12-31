## RaceResult
- id: string; // 201509030811
- raceDate: Date;
- monthCnt: number; // 3
- course: string; // 阪神
- dayCnt: number; // 8

- wether: Wether; // 晴
  - wethers = ["晴", "曇", "雨", "小雨", "雪", "小雪"]

- raceNumber: number; // 11
- name: string; // 第56回宝塚記念(G1)
- raceGrade?: number; // 1

- horseCnt: number; // 出走馬数 

- raceType: raceTypes
  - raceTypes = ["芝", "ダ", "芝 ダート", "障"]
- dist: number; // 2200

- trackCond: TrackCond; // 良
  - trackConds = ["良", "稍重", "重", "不良"]

- raceResult: RaceResult[];

## RaceResult
- starterNumber: number //枠番
- horseNumber: number //馬番

- odds: union([number, undefined]) //単勝
- popularity: union([number, undefined]) //人気

- ranking: union([ //着順
    number, "失", "中", "除", "取"
  ])

- age: number

- jockey: string //騎手
- carryWeight: number //斤量

- time: union([number, undefined])
- margin: string //着差
- cornerRanking: union([array(number),undefined]) //通過
- lastPhaseTime: union([number, undefined]) //上り

- weight: union([number, "計不"]) //馬体重
- weightChange: union([number, "計不"]) //増加体重
- prizeMoney: number //賞金(万円)