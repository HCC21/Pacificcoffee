const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;
const PASSWORD = 'PacificCoffee2024'; // ✅ 可自行修改

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: true
}));

// 靜態檔案：登入成功後的頁面
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, 'public', 'portal.html'));
  } else {
    res.sendFile(path.join(__dirname, 'login.html'));
  }
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/');
  } else {
    res.send('<h3>🚫 密碼錯誤！</h3><a href="/">返回</a>');
  }
});

app.listen(PORT, () => {
  console.log(`✅ 伺服器已啟動：http://localhost:${PORT}`);
});