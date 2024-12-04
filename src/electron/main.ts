import path from "path"
import seed from './seed'

import { app, BrowserWindow } from "electron"
import { createTablesIfNotExist, createRouter } from './start'

const isDev = !app.isPackaged;

function createWindow() {
    let win = new BrowserWindow({
        width: 1350,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    win.setTitle("Мои финансы");
    win.setMenu(null);

    if (isDev) {
        win.loadFile("index.html")
    } else {
        win.loadFile(path.join(app.getAppPath(), "/build/index.html"));
    }
}

app.whenReady().then(async () => {
    console.log("Запуск приложения");

    await createTablesIfNotExist();
    createRouter();

    if (process.env.SEED === "true") {
        await seed();
    }

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
