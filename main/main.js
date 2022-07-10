// eslint-disable-next-line
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const sqlite3 = require("sqlite3");

let mainWin;

function createWindow() {
	mainWin = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: path.join(__dirname, "preload.js"),
		},
	});
	mainWin.loadURL("http://localhost:8080");
}

const database = new sqlite3.Database("./main/db/db.sqlite3", (err) => {
	if (err) console.error("Database opening error: ", err);
});

app.whenReady().then(() => {
	database.serialize(() => {
		database.run(`CREATE TABLE IF NOT EXISTS todayCollection (
			taskid	INTEGER NOT NULL,
			text	TEXT NOT NULL,
			note	TEXT,
			collection	TEXT,
			id	INTEGER,
			important	INTEGER,
			PRIMARY KEY("taskid")
		);`);

		database.run(`CREATE TABLE IF NOT EXISTS meta (
						metaid INTEGER,
						date INTEGER NOT NULL,
						timer INTERGER 
						)`);
	});
	createWindow();
});

app.on("window-all-closed", () => {
	database.close();
	app.quit();
});

//	GLOBAL
//
ipcMain.on("add-collection", (event, args) => {
	const dbName = `${args}Collection`;
	const sql = `CREATE TABLE IF NOT EXISTS ${dbName}
		(taskid INTEGER PRIMARY KEY,
		text TEXT NOT NULL,
		notes TEXT);
	)`;
	database.run(sql);
});

ipcMain.on("get-collections", (event, args) => {
	database.all(
		`SELECT 
					name
			FROM 
					sqlite_schema
			WHERE 
					type ='table' AND 
					name NOT LIKE 'sqlite_%' AND
					name LIKE '%Collection';`,
		(err, data) => {
			event.reply("get-collections-reply", data);
		}
	);
});

ipcMain.on("rename-collection", (event, args) => {
	const sql = `ALTER TABLE ${args.collection}
	RENAME TO ${args.newName};`;
	database.run(sql);
});

ipcMain.on("delete-collection", (event, args) => {
	const sql = `DROP TABLE IF EXISTS ${args}`;
	database.run(sql);
});

ipcMain.on("get-collection", (event, args) => {
	if (args === null) return;
	const sql = `SELECT * FROM ${args};`;
	database.all(sql, (err, rows) => {
		event.reply("get-collection-reply", rows);
	});
});

ipcMain.on("add-task", (event, args) => {
	let sql;
	if (args.text === "") {
		return;
	}

	/// Today Planned Old
	if (
		["todayCollection", "plannedCollection", "oldCollection"].includes(
			args.collection
		)
	) {
		sql = `INSERT INTO tasks (text)
	VALUES ('${args.text}');`;
	} else {
		sql = `INSERT INTO ${args.collection} (text)
	VALUES ('${args.text}');`;
	}
	database.run(sql);
});
ipcMain.on("update-task", (event, args) => {
	const key = Object.keys(args.task)[1];

	const sql = `UPDATE ${args.collection} 
	SET ${key} = '${args.task[key]}'
	WHERE taskid=${args.task.id};`;
	database.run(sql, (err) => {
		event.reply("update-task-reply", "ok");
	});
});
ipcMain.on("delete-task", (event, args) => {
	const sql = `DELETE FROM ${args.collection} 
	WHERE taskid=${args.id};`;
	database.run(sql, (err) => {
		event.reply("delete-task-reply", "ok");
	});
});

ipcMain.on("get-meta", (event, args) => {
	const sql = `SELECT day,timer,page,collection FROM meta WHERE metaid=1`;
	database.all(sql, (err, rows) => {
		event.reply("get-meta-reply", rows);
	});
});

ipcMain.on("dev", (event, args) => {
	const sql = `${args}`;
	database.run(sql);
});
ipcMain.on("set-meta", (event, args) => {
	const sql = `UPDATE meta
	SET ${args[0]} = '${args[1]}'
	WHERE metaid=1;	
	`;
	database.run(sql);
});
ipcMain.on("add-to-today", (event, args) => {
	database.get(
		`SELECT text,notes FROM ${args.collection} WHERE taskid=${args.id}`,
		(err, row) => {
			const sql = `INSERT into todayCollection	(text,notes,collection,id)
				VALUES ('${row.text}','${row.notes}','${args.collection}',${args.id});`;
			database.run(sql);
		}
	);
});
