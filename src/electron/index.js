import { app, BrowserWindow } from 'electron';

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadFile('dist/index.html');

  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
