var db = require('../db/db');
var app = require('../server/index');

app.post('/user', (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push('no name specified');
  }
  if (!req.body.email) {
    errors.push('no email specified');
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(' ') });
    return;
  }
  var data = {
    name: req.body.name,
    email: req.body.email
  };
  var sql = 'INSERT INTO user (name, email) VALUES (?,?)';
  var params = [data.name, data.email];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json(('error': err.message));
      return;
    }
    res.json({
      message: 'success',
      data: data,
      id: this.lastID
    });
  });
});
