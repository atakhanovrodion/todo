import { app, BrowserWindow, ipcMain } from 'electron';
const path = require('path');
const url = require('url');

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
    let result = knex.select('day', 'text').from('user');

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
        console.log('success');
      });
  });

  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
