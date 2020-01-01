import {app, BrowserWindow} from 'electron'

let win

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.setMenuBarVisibility(false)

    win.loadFile('dist/index.html')

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
