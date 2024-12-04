import CalculationController from "./Calculation/CalculationController"
import CategoryController from "./SpendingCategory/CategoryController"
import CategoryModel from "./SpendingCategory/CategoryModel"
import DistributionController from "./DustributionFinances/DistributionController"
import DistributionModel from "./DustributionFinances/DustributionModel"
import fs from "fs"
import NoteController from "./Note/NoteController"
import NoteModel from "./Note/NoteModel"
import path from 'path'
import TransactionController from "./Transaction/TransactionController"
import TransactionModel from "./Transaction/TransactionModel"

import { DATABASE_NAME, DATABASE_PATH } from "./connectionDB"
import { TablesNames, VALUE_MISSING } from "./constants"
import { ipcMain } from "electron"

export async function createTablesIfNotExist(): Promise<void> {
    try {

        if (!fs.existsSync(DATABASE_PATH)) {
            fs.mkdirSync(DATABASE_PATH)
        }

        if (!fs.existsSync(path.join(DATABASE_PATH, DATABASE_NAME))) {

            await DistributionModel.createTable();
            console.info(`Таблица "${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME}" создана`);

            await CategoryModel.createTable();
            console.info(`Таблица "${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}" создана`);

            await TransactionModel.createTable();
            console.info(`Таблица "${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}" создана`);

            await NoteModel.createTable();
            console.info(`Таблица "${TablesNames.NOTES_TABLE}" создана`);

            await DistributionModel.add("тип не выбран", 0);
            await CategoryModel.add("категория не выбрана");
            await NoteModel.add(VALUE_MISSING);
            console.info("Созданы значения по умолчанию");

        }

    } catch (error) {
        console.log("Ошибка при создании таблиц:");
        console.log((error as Error).message);
    }
}

function ipcHandle<Channel extends keyof EventPayloadMapping>(
    channel: Channel,
    listener: (_: Electron.IpcMainInvokeEvent, payload: EventPayloadMapping[Channel][0]) => EventPayloadMapping[Channel][1]
): void {
    ipcMain.handle(channel, listener)
}

export function createRouter(): void {

    ipcHandle("getAllDistributionTypes", () => DistributionController.getAllDistributionTypes())
    ipcHandle("addDistributionType", (_, distributionType) => DistributionController.addDistributionType(distributionType))
    ipcHandle("editDistributionType", (_, distributionType) => DistributionController.editDistributionType(distributionType))
    ipcHandle("deleteDistributionType", (_, distributionType) => DistributionController.deleteDistributionType(distributionType))

    ipcHandle("getAllCategories", () => CategoryController.getAllCategories())
    ipcHandle("addSpendingCategory", (_, spendingCategory) => CategoryController.addSpendingCategory(spendingCategory))
    ipcHandle("editSpendingCategory", (_, spendingCategory) => CategoryController.editSpendingCategory(spendingCategory))
    ipcHandle("deleteSpendingCategory", (_, spendingCategory) => CategoryController.deleteSpendingCategory(spendingCategory))

    ipcHandle("getAllTransactions", (_, filter) => TransactionController.getAllTransactions(filter))
    ipcHandle("getAllTransactionDates", () => TransactionController.getAllTransactionDates())
    ipcHandle("getNumberOfTransactions", (_, filter) => TransactionController.getNumberOfTransactions(filter))
    ipcHandle("addTransaction", (_, transaction) => TransactionController.addTransaction(transaction))
    ipcHandle("editTransaction", (_, transaction) => TransactionController.editTransaction(transaction))
    ipcHandle("deleteTransaction", (_, transaction) => TransactionController.deleteTransaction(transaction))

    ipcHandle("getNotes", (_, substring) => NoteController.getNotes(substring))

    ipcHandle("getCapital", () => CalculationController.getCapital())
    ipcHandle("getTotalAmount", (_, date) => CalculationController.getTotalAmount(date))
    ipcHandle("getStatisticsOnExpenses", (_, date) => CalculationController.getStatisticsOnExpenses(date))
    ipcHandle("getInflationData", (_, year) => CalculationController.getInflationData(year))

}
