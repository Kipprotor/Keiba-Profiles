### 動作プロセス

- 引数として受け取った馬の名前をEUC-JP形式でURIエンコードする。(encodedName
  に代入する)
- 変数展開し以下のURLにアクセスし、htmlを取得する。
  "https://db.netkeiba.com/?pid=horse_list&word=${encodedName}"
  - このとき https://db.netkeiba.com/horse/2009102739/
    などのURLにリダイレクトされる。
- 関数に代入する: getHorseInfo(html)
  - htmlから tableタグでクラス名が db_prof_table で始まる要素を取得
    (取得した要素は prof と呼ぶ)
  - prof から tdタグ、またはtdタグの下にあるaタグのテキストを取得する。
  - テキストは全て EUC-JP でエンコードされているので UTF-8 にエンコードし直す。
- エンコードしなおしたテキストをターミナルに表示する。

### API 一覧表
