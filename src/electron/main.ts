import path from 'path';
import seed from './seed';

import { app, BrowserWindow } from 'electron';
import { createRouter, createTablesIfNotExist } from './start';

const isDev = !app.isPackaged;

function createWindow() {
    let win = new BrowserWindow({
        minWidth: 1350,
        minHeight: 800,
        width: 1350,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.setTitle('Мои финансы');
    // win.setMenu(null);

    if (isDev) {
        win.loadFile('index.html');
    } else {
        win.loadFile(path.join(app.getAppPath(), '/build/index.html'));
    }
}

app.whenReady().then(async () => {
    await createTablesIfNotExist();
    createRouter();
    if (process.env.SEED === 'true') await seed();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
