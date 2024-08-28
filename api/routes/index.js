const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 使用文件数据库而不是内存数据库
const dbPath = path.resolve(__dirname, 'user.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT)");
  db.get("SELECT COUNT(*) AS count FROM user", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO user (name, email, phone) VALUES ('John Doe', 'john@example.com', '123-456-7890')");
    }
  });
});

router.use('/user', middleware.user(), (req, res) => {
  db.get("SELECT * FROM user WHERE id = 1", (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(row);
    }
  });
});

router.post('/userupdate', (req, res) => {
  const { name, email, phone } = req.body;
  db.run("UPDATE user SET name = ?, email = ?, phone = ? WHERE id = 1", [name, email, phone], function(err) {
    console.log('update user', err, this);
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;