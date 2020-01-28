const express = require('express');

const app = express();
const port = 3002;

const db = require('../db/db');
const cors = require('cors');
app.listen(port, () => {
  console.log('server on');
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get('/', (req, res, next) => {
  var sql = 'select * from user';
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});
app.post('/', (req, res, next) => {
  console.log(req.body);
  var errors = [];
  if (!req.body.day) {
    errors.push('no day specified');
  }
  if (!req.body.text) {
    errors.push('no text specified');
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(' ') });
    return;
  }
  var data = {
    day: req.body.day,
    text: req.body.text
  };
  var sql = 'INSERT INTO user (day, text) VALUES (?,?)';
  var params = [data.day, data.text];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: data,
      id: this.lastID
    });
  });
});
app.use(function(req, res) {
  res.status(404);
});

module.exports = app;
