const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./main/test/testdb.sqlite3", (err) => {
	if (err) console.error("Database opening error: ", err);
});
beforeEach(() => {
	db.serialize(() => {
		const sql = `CREATE TABLE IF NOT EXISTS collections (
			id INTEGER PRIMARY KEY,
			name TEXT UNIQUE NOT NULL 
		)`;
		db.run(sql);
	});
});

afterEach(() => {
	db.serialize(() => {
		db.run("DROP TABLE IF EXISTS collections");
		db.close();
	});
});

test("could create collection", (done) => {
	db.serialize(() => {
		try {
			db.run("INSERT INTO collections (name) VALUES('test')");
			db.get(
				"SELECT name FROM collections WHERE (name='test')",
				(err, rows) => {
					expect(rows.name).toBe("test");
					done();
				}
			);
		} catch (error) {
			done(error);
		}
	});
});

test("return erron on not unique collections name", (done) => {
	try {
		db.run("INSERT INTO collections (name) VALUES('test1')");

		done();
	} catch (error) {
		console.log(error);
		done(error);
	}
});

test.todo("it should get collections");
