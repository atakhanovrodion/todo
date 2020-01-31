import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
const path = require('path');
const url = require('url');
const os = require('os');
let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/db.sqlite'
  }
});

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('dist/index.html');

  ipcMain.on('mainWindowLoaded', function() {
    let result = knex.select('id', 'day', 'text').from('user');

    result.then(function(rows) {
      mainWindow.webContents.send('resultSent', rows);
    });
  });

  ipcMain.on('submitChanges', (e, result) => {
    console.log(result);
    knex('user')
      .insert({
        day: result[0],
        text: result[1]
      })
      //TODO ERROR HANDLER
      .then((res, err) => {
        console.log(res);
        mainWindow.webContents.send('lastId', [res, result[1]]);
        console.log('success');
      });
  });
  ipcMain.on('deleteItem', (e, result) => {
    knex('user')
      .where({ id: result })
      .del()
      .then((res, err) => {
        console.log(res);
        mainWindow.webContents.send('itemDeleted', result);
      });
  });

  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.on('ready', async () => {
  await BrowserWindow.addDevToolsExtension(
    path.join(
      os.homedir(),
      '/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0'
    )
  );
  createWindow();
});
