const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

// じゃんけん
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = parseInt( req.query.win ) || 0;
  let total = parseInt( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

// おみくじ
app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '吉';
  else if( num==3 ) luck = '中吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';

  res.render( 'luck', {number:num, luck:luck} );
});

// ガチャ
app.get("/gacha", (req, res) => {
  const star6 = ["中野一花", "中野二乃", "中野三玖", "中野四葉", "中野五月"];
  const star5 = ["ネオ", "アビス", "アルスラーン", "ヤクモ", "キリンジ", "マギア", "マサムネ", "ナイトメア", "久遠"];
  const star4 = ["星4キャラ"];

  let result = '';
  const randomNumber = Math.random() * 100; // 0〜100の乱数

  if (randomNumber < 1.2) { // 1.2%の確率で星6を排出
    result = star6[Math.floor(Math.random() * star6.length)];
  } else if (randomNumber < 1.6) { // 0.4%の確率で星5を排出
    result = star5[Math.floor(Math.random() * star5.length)];
  } else { // それ以外は星4を排出
    result = star4[0];
  }

  res.render('gacha', { character: result });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
