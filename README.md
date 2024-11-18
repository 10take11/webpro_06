# app5.jsの説明

### ファイル一覧

ファイル名|説明
-|-
app5.js | プログラム本体
viwes/show.ejs | /hello1と/hello2のメッセージ表示
views/icon.ejs | アイコンの表示
views/janken.ejs | じゃんけんの開始画面
views/luck.ejs | おみくじ開始画面
views/gacha.ejs | ガチャ開始画面

#### 起動方法
1. ターミナルで```node app5.js```を起動する
1. Webブラウザで```localhost:8080/(上記のファイル名)```にアクセスする
1. ユーザーが自らの手で入力

#### Gitでの管理
1. ターミナルを起動する
1. ```git add .```
1. ```git commit -am 'コメント'```
1. ```git push```

上記の方法でGithabに保存及び管理を行う

#### 機能の説明
1. /hello1と/hello2のHelloメッセージの表示
・説明
それぞれ異なる形式で「Hello」と「Bon　Jour」を表示する
・使用手順
/hello1では```http://localhost:8080/hello1```に，/hello2では```http://localhost:8080/hello2```にアクセスする．/hello1と/hello2は同じメッセージが表示されるが，/hello2は文字列を直接テンプレートに渡している．

1. /iconのアイコンの表示
・説明
Appleロゴ画像を表示する．
・使用手順
```http://localhost:8080/icon```にアクセスすることで，```icon.ejs```テンプレートを使用してAppleのロゴを表示する．

1. /jankenのじゃんけんゲーム
・説明
ユーザーの手（グー，チョキ，パー）とコンピューターの手でじゃんけんを行う．勝敗と合計数がカウントされる．
・使用手順
```http://localhost:8080/janken```にアクセスし，グー，チョキ，パーを送信する．また，winとtotalのパラメターを使用することで，現在の勝数と合計試合を継続できる．結果はjanken.ejsテンプレートを通じて表示され，ユーザーの手・コンピュターの手・判定結果が出力される．

1. /luckのおみくじ
・説明
大吉から大凶まで6種類の運勢がランダムに表示される．
・使用手順
```http://localhost:8080/luck```にアクセスするだけで結果が表示される．luck.ejsテンプレートを使用して運勢と番号が出力される.

1. /gachaのガチャ機能
・説明
1.2%の確率で星6キャラクター，0.4%の確率で星5キャラクター，それ以外で星4キャラクターを取得できるガチャである．
・使用手順
```http://localhost:8080/gacha```にアクセスするだけでガチャの結果が表示される．gacha.ejsテンプレートを使用し，キャラクター名が表示される．
#### フローチャート
##### /hello1と/hello2のフローチャート
```mermaid
flowchart TD;

start1["リクエスト受信 (/hello1)"]
prepareMessages1["message1='Hello world'<br>message2='Bon jour'"]
renderShow1["show.ejs を描画<br>{greet1: message1, greet2: message2}"]
end1["終了"]

start1 --> prepareMessages1
prepareMessages1 --> renderShow1
renderShow1 --> end1
```
```mermaid
flowchart TD;

start2["リクエスト受信 (/hello2)"]
renderShow2["show.ejs を描画<br>{greet1: 'Hello world', greet2: 'Bon jour'}"]
end2["終了"]

start2 --> renderShow2
renderShow2 --> end2
```

##### /iconのフローチャート
```mermaid
flowchart TD;

start["リクエスト受信 (/icon)"]
renderIcon["icon.ejs を描画<br>{filename: './public/Apple_logo_black.svg', alt: 'Apple Logo'}"]
end1["終了"]

start --> renderIcon
renderIcon --> end1
```
##### /jankenのフローチャート
```mermaid
flowchart TD;

start["リクエスト受信 (/janken)"]
checkParams["パラメータ hand, win, total を取得"]
generateCPU["ランダムでCPUの手を決定"]
cpuHand["numの値に応じて<br>CPUの手を設定"]
judgement["結果を判定"]
draw["引き分け"]
win["勝ち (win++)"]
lose["負け"]
updateTotal["totalを1増加"]
displayResult["結果を表示 (res.render)"]
end1["終了"]

start --> checkParams
checkParams --> generateCPU
generateCPU --> cpuHand
cpuHand --> judgement

judgement -->|hand === cpu| draw
judgement -->|勝ち条件成立| win
judgement -->|それ以外| lose

draw --> updateTotal
win --> updateTotal
lose --> updateTotal

updateTotal --> displayResult
displayResult --> end1
```
##### /luckのフローチャート
```mermaid
flowchart TD;

start["リクエスト受信 (/luck)"]
generateNum["乱数生成: num = Math.floor(Math.random() * 6 + 1)"]
checkLuck["num の値に応じて luck を設定"]
luck1["num == 1: 大吉"]
luck2["num == 2: 吉"]
luck3["num == 3: 中吉"]
luck4["num == 4: 末吉"]
luck5["num == 5: 凶"]
luck6["num == 6: 大凶"]
renderLuck["luck.ejs を描画<br>{number: num, luck: luck}"]
end1["終了"]

start --> generateNum
generateNum --> checkLuck

checkLuck -->|num == 1| luck1
checkLuck -->|num == 2| luck2
checkLuck -->|num == 3| luck3
checkLuck -->|num == 4| luck4
checkLuck -->|num == 5| luck5
checkLuck -->|num == 6| luck6

luck1 --> renderLuck
luck2 --> renderLuck
luck3 --> renderLuck
luck4 --> renderLuck
luck5 --> renderLuck
luck6 --> renderLuck

renderLuck --> end1
```

##### /gachaのフローチャート

```mermaid
flowchart TD;

start["リクエスト受信 (/gacha)"]
defineCharacters["星6, 星5, 星4 キャラクターを定義"]
generateRandom["ランダム値生成: randomNumber = Math.random() * 100"]
checkProbability["確率に応じて排出キャラを選択"]
star6["1.2%未満: 星6キャラ"]
star5["1.6%未満: 星5キャラ"]
star4["それ以外: 星4キャラ"]
renderGacha["gacha.ejs を描画<br>{character: result}"]
end1["終了"]

start --> defineCharacters
defineCharacters --> generateRandom
generateRandom --> checkProbability

checkProbability -->|randomNumber < 1.2| star6
checkProbability -->|1.2 <= randomNumber < 1.6| star5
checkProbability -->|それ以外| star4

star6 --> renderGacha
star5 --> renderGacha
star4 --> renderGacha

renderGacha --> end1
```



