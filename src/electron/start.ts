import AccountController from './controllers/AccountController';
import AccountModel from './models/AccountModel';
import CategoryController from './controllers/CategoryController';
import CategoryModel from './models/CategoryModel';
import fs from 'fs';
import path from 'path';
import TransactionController from './controllers/TransactionController';
import TransactionModel from './models/TransactionModel';

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
            await CategoryModel.createTable();
            await TransactionModel.createTable();

        }

    } catch(error) {

        console.log('Ошибка при создании таблиц');
        console.log((error as Error).message);

    }
}

export function createRouter(): void {

    ipcHandle('getAllAccounts', () => AccountController.getAllAccounts());
    ipcHandle('addAccount', () => AccountController.addAccount());
    ipcHandle('editAccountName', (_, data) => AccountController.editAccountName(data));
    ipcHandle('editAccountAmount', (_, data) => AccountController.editAccountAmount(data));
    ipcHandle('editAccountDeletionField', (_, data) => AccountController.editAccountDeletionField(data));

    ipcHandle('getAllCategories', () => CategoryController.getAllCategories());
    ipcHandle('addCategory', () => CategoryController.addCategory());
    ipcHandle('editCategoryName', (_, data) => CategoryController.editCategoryName(data));
    ipcHandle('editCategoryDeletionField', (_, data) => CategoryController.editCategoryDeletionField(data));

    ipcHandle('getAllTransactions', (_, filter) => TransactionController.getAllTransactions(filter));
    ipcHandle('getAllYears', () => TransactionController.getAllYears());
    ipcHandle('getNumberOfTransactions', (_, filter) => TransactionController.getNumberOfTransactions(filter));
    ipcHandle('addTransaction', (_, date) => TransactionController.addTransaction(date));
    ipcHandle('editTransactionDate', (_, data) => TransactionController.editTransactionDate(data));
    ipcHandle('editSourceOfTransaction', (_, data) => TransactionController.editSourceOfTransaction(data));
    ipcHandle('editTransactionAddress', (_, data) => TransactionController.editTransactionAddress(data));
    ipcHandle('editSpendingCategory', (_, data) => TransactionController.editSpendingCategory(data));
    ipcHandle('editTransactionAmount', (_, data) => TransactionController.editTransactionAmount(data));
    ipcHandle('deleteTransaction', (_, id) => TransactionController.deleteTransaction(id));

}
