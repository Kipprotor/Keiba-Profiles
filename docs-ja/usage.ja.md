### **KeibaProfile**: netkeiba.com から競走馬の情報を取得するライブラリ・コマンド

## 使い方

#### コマンド: hoofsteps (開発一時中止)

hoofsteps \[オプション\] 馬名

##### 説明

指定した競走馬の名前を netkeiba.com で検索し表示します。
オプションが指定されなかった場合 -t と -p を適用し表示します。

- -a --all
  - オプション -tpir と同様。全ての表示オプションを適用する。

- -t, --title
  - 馬名 英語の馬名(JRA所属の場合) 年齢 性別 登録状況 などの情報を表示

- -p, --picture
  - もしあれば写真をダウンロード

- -i, --info
  - 以下の競走馬についての詳しい情報を表示。なお取得できなかった場合は、\-
    と表示される。
    - 生年月日
    - 調教師
    - 馬主
    - 募集情報 (あれば)
    - 生産者
    - 産地
    - セリ取引価格
    - 獲得賞金
    - 通算成績

- -r, --race
  - 競走記録を表示
  - 表示される情報
    - 日付 開催日 天気 R レース名
    - 頭数 枠番 馬番 オッズ 人気 着順
    - 騎手 斤量 距離 馬場
    - タイム 着差 通過 ペース
    - 馬体重 勝ち馬 賞金

- -h, --help
  - 使い方を表示
