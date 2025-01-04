"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // UUID生成用

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// メモリ内データ（データベースの代わり）
let tasks = [];

// To-Doリスト: タスク追加
app.post('/tasks', (req, res) => {
    const { title, dueDate } = req.body;

    // 入力データのバリデーション
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ status: 'error', message: 'Invalid title' });
    }
    if (!dueDate || isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ status: 'error', message: 'Invalid due date' });
    }

    const id = uuidv4(); // 一意のIDを生成
    const newTask = { id, title: title.trim(), dueDate, completed: false };
    tasks.push(newTask);

    res.json({ status: 'success', task: newTask });
});

// To-Doリスト: タスク削除
app.post('/tasks/delete', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ status: 'error', message: 'Task ID is required' });
    }

    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);

    if (tasks.length === initialLength) {
        return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    res.json({ status: 'success', remainingTasks: tasks });
});

// To-Doリスト: タスク完了状態の切り替え
app.post('/tasks/toggle', (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ status: 'error', message: 'Task ID is required' });
    }

    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        res.json({ status: 'success', task });
    } else {
        res.status(404).json({ status: 'error', message: 'Task not found' });
    }
});

// ルートページ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// サーバー起動
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});













// "use strict";
// const express = require("express");
// const app = express();

// let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

// app.set('view engine', 'ejs');
// app.use("/public", express.static(__dirname + "/public"));
// app.use(express.urlencoded({ extended: true }));

// app.get("/hello1", (req, res) => {
//   const message1 = "Hello world";
//   const message2 = "Bon jour";
//   res.render('show', { greet1:message1, greet2:message2});
// });

// app.get("/hello2", (req, res) => {
//   res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
// });

// app.get("/icon", (req, res) => {
//   res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
// });

// app.get("/luck", (req, res) => {
//   const num = Math.floor( Math.random() * 6 + 1 );
//   let luck = '';
//   if( num==1 ) luck = '大吉';
//   else if( num==2 ) luck = '中吉';
//   console.log( 'あなたの運勢は' + luck + 'です' );
//   res.render( 'luck', {number:num, luck:luck} );
// });

// app.get("/janken", (req, res) => {
//   let hand = req.query.hand;
//   let win = Number( req.query.win );
//   let total = Number( req.query.total );
//   console.log( {hand, win, total});
//   const num = Math.floor( Math.random() * 3 + 1 );
//   let cpu = '';
//   if( num==1 ) cpu = 'グー';
//   else if( num==2 ) cpu = 'チョキ';
//   else cpu = 'パー';
//   // ここに勝敗の判定を入れる
//   // 今はダミーで人間の勝ちにしておく
//   let judgement = '勝ち';
//   win += 1;
//   total += 1;
//   const display = {
//     your: hand,
//     cpu: cpu,
//     judgement: judgement,
//     win: win,
//     total: total
//   }
//   res.render( 'janken', display );
// });

// app.get("/get_test", (req, res) => {
//   res.json({
//     answer: 0
//   })
// });

// app.get("/add", (req, res) => {
//   console.log("GET");
//   console.log( req.query );
//   const num1 = Number( req.query.num1 );
//   const num2 = Number( req.query.num2 );
//   console.log( num1 );
//   console.log( num2 );
//   res.json( {answer: num1+num2} );
// });

// app.post("/add", (req, res) => {
//   console.log("POST");
//   console.log( req.body );
//   const num1 = Number( req.body.num1 );
//   const num2 = Number( req.body.num2 );
//   console.log( num1 );
//   console.log( num2 );
//   res.json( {answer: num1+num2} );
// });

// // これより下はBBS関係
// app.post("/check", (req, res) => {
//   // 本来はここでDBMSに問い合わせる
//   res.json( {number: bbs.length });
// });

// app.post("/read", (req, res) => {
//   // 本来はここでDBMSに問い合わせる
//   const start = Number( req.body.start );
//   console.log( "read -> " + start );
//   if( start==0 ) res.json( {messages: bbs });
//   else res.json( {messages: bbs.slice( start )});
// });

// app.post("/post", (req, res) => {
//   const name = req.body.name;
//   const message = req.body.message;
//   console.log( [name, message] );
//   // 本来はここでDBMSに保存する
//   bbs.push( { name: name, message: message } );
//   res.json( {number: bbs.length } );
// });

// app.get("/bbs", (req,res) => {
//     console.log("GET /BBS");
//     res.json( {test: "GET /BBS" });
// });

// app.post("/bbs", (req,res) => {
//     console.log("POST /BBS");
//     res.json( {test: "POST /BBS"});
// })

// app.get("/bbs/:id", (req,res) => {
//     console.log( "GET /BBS/" + req.params.id );
//     res.json( {test: "GET /BBS/" + req.params.id });
// });

// app.put("/bbs/:id", (req,res) => {
//     console.log( "PUT /BBS/" + req.params.id );
//     res.json( {test: "PUT /BBS/" + req.params.id });
// });

// app.delete("/bbs/:id", (req,res) => {
//     console.log( "DELETE /BBS/" + req.params.id );
//     res.json( {test: "DELETE /BBS/" + req.params.id });
// });



// // // Node.js + Express サーバーコードの例
// // const express = require('express');
// // const app = express();
// // const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// // メモリ内データ（データベースの代わり）
// let tasks = [];
// let threads = [];
// let users = [];

// // To-Doリスト: タスク追加
// app.post('/tasks', (req, res) => {
//     const { title, dueDate } = req.body;
//     const id = tasks.length + 1;
//     const newTask = { id, title, dueDate, completed: false };
//     tasks.push(newTask);
//     res.json({ status: 'success', task: newTask });
// });

// // To-Doリスト: タスク削除
// app.post('/tasks/delete', (req, res) => {
//     const { id } = req.body;
//     tasks = tasks.filter(task => task.id !== id);
//     res.json({ status: 'success', remainingTasks: tasks });
// });

// // BBS: スレッドのピン固定
// app.post('/threads/pin', (req, res) => {
//     const { threadId } = req.body;
//     const thread = threads.find(t => t.id === threadId);
//     if (thread) {
//         thread.pinned = true;
//         res.json({ status: 'success', thread });
//     } else {
//         res.status(404).json({ status: 'error', message: 'Thread not found' });
//     }
// });

// // BBS: ユーザーのプロフィール編集
// app.post('/users/edit', (req, res) => {
//     const { userId, nickname } = req.body;
//     const user = users.find(u => u.id === userId);
//     if (user) {
//         user.nickname = nickname;
//         res.json({ status: 'success', user });
//     } else {
//         res.status(404).json({ status: 'error', message: 'User not found' });
//     }
// });

// // サーバー起動
// const PORT = 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.listen(8080, () => console.log("Example app listening on port 8080!"));