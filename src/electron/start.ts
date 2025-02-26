import AccountController from './controllers/AccountController';
import AccountModel from './models/AccountModel';
import fs from 'fs';
import path from 'path';

import { DATABASE_NAME, DATABASE_PATH } from './connectionDB';
import { ipcMain } from 'electron';

function ipcHandle<Channel extends keyof EventPayloadMapping>(
    channel: Channel,
    listener: (_: Electron.IpcMainInvokeEvent, payload: EventPayloadMapping[Channel][0]) => EventPayloadMapping[Channel][1]
): void {
    ipcMain.handle(channel, listener);
}

export async function createTablesIfNotExist(): Promise<void> {
    try {

        if (!fs.existsSync(DATABASE_PATH)) {
            fs.mkdirSync(DATABASE_PATH);
        }

        if (!fs.existsSync(path.join(DATABASE_PATH, DATABASE_NAME))) {

            await AccountModel.createTable();

        }

    } catch(error) {

        console.log('Ошибка при создании таблиц');
        console.log((error as Error).message);

    }
}

export function createRouter(): void {

    ipcHandle('getAllAccounts', () => AccountController.getAllAccounts())
    ipcHandle('addAccount', () => AccountController.addAccount())
    ipcHandle('editAccountName', (_, data) => AccountController.editAccountName(data))
    ipcHandle('editAccountAmount', (_, data) => AccountController.editAccountAmount(data))
    ipcHandle('editAccountDeletionField', (_, data) => AccountController.editAccountDeletionField(data))

}
