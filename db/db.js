var sqlite = require('sqlite3');

const DBSOURCE = 'db/db.sqlite';

let db = new sqlite.Database(DBSOURCE, err => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to database');
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day INTEGER,
            text TEXT

        )`,
      err => {
        if (err) {
          console.log(err.message);
        } else {
          var insert = 'INSERT INTO user (day,text) VALUES (?,?)';
          db.run(insert, [2, 'DO SOMETHING']);
          db.run(insert, [3, 'TRY TO DO SOMETHING']);
        }
      }
    );
  }
});
module.exports = db;
