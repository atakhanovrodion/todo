const electron = window.require("electron");
const { ipcRenderer } = electron;

function getCollections() {
	return new Promise((resolve) => {
		ipcRenderer.once("get-collections-reply", (_, args) => {
			resolve(args);
		});
		ipcRenderer.send("get-collections", "collections");
	});
}

function addCollection(collection) {
	return new Promise((resolve) => {
		ipcRenderer.once("async-reply", (_, args) => {
			resolve(args);
		});
		ipcRenderer.send("add-collection", collection);
	});
}

function renameCollection(collection, newName) {
	ipcRenderer.send("rename-collection", { collection, newName });
}
function deleteCollection(collection) {
	ipcRenderer.send("delete-collection", collection);
}
function getCollection(collection) {
	return new Promise((resolve) => {
		ipcRenderer.once("get-collection-reply", (_, args) => {
			resolve(args);
		});
		ipcRenderer.send("get-collection", collection);
	});
}
function addTask(collection, text) {
	return new Promise((resolve) => {
		ipcRenderer.once("add-task-reply", (_, args) => {
			resolve(args);
		});
		ipcRenderer.send("add-task", { collection, text });
	});
}

function updateTask(collection, task) {
	return new Promise((resolve) => {
		ipcRenderer.once("update-task-reply", (_, args) => {
			resolve(args);
		});

		ipcRenderer.send("update-task", { collection, task });
	});
}
function deleteTask(collection, id) {
	return new Promise((resolve) => {
		ipcRenderer.once("delete-task-reply", (_, args) => {
			resolve(args);
		});

		ipcRenderer.send("delete-task", { collection, id });
	});
}
function getMeta() {
	return new Promise((resolve) => {
		ipcRenderer.once("get-meta-reply", (_, args) => {
			console.log(args);
			resolve(args);
		});

		ipcRenderer.send("get-meta", "meta");
	});
}

function sendDev(sql) {
	console.log("sql=", sql);
	ipcRenderer.send("dev", sql);
}

function setMeta(key, value) {
	ipcRenderer.send("set-meta", [key, value]);
}

function addToToday(collection, id) {
	ipcRenderer.send("add-to-today", { collection, id });
}

export {
	getCollections,
	addCollection,
	renameCollection,
	deleteCollection,
	getCollection,
	addTask,
	updateTask,
	deleteTask,
	getMeta,
	sendDev,
	setMeta,
	addToToday,
};
