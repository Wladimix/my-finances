import AddingTransaction from "./ExecutionOfTransactions/AddingTransaction"
import DeletingTransaction from "./ExecutionOfTransactions/DeletingTransaction"
import DistributionModel from "../DustributionFinances/DustributionModel"
import EditingTransaction from "./ExecutionOfTransactions/EditingTransaction"
import NoteService from "../Note/NoteService"
import ObjectEditing from "../lib/ObjectEditing"
import TransactionModel from "./TransactionModel"

import { convertAmountToNumber, convertAmountToString, makeDateSearchOptions } from "../lib/utils"
import { TablesNames } from "../constants"

class TransactionService {

    async getAll(filter: TransactionFilter): Promise<AllTransactions>  {
        const transactionsQuery = TransactionModel.getAll(filter.note, filter.page as number);

        const result = await transactionsQuery.whereBetween(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, makeDateSearchOptions(filter.year, filter.month));
        console.info(`Получены данные из таблицы "${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}"`);

        return result.map(transaction => {

            const OE = new ObjectEditing(transaction);

            OE.changeProperty("date", timestamp => new Date(timestamp));
            OE.changeProperty("sourceOfTransactionDeleted", value => Boolean(value));
            OE.changeProperty("spendingCategoryDeleted", value => Boolean(value));
            OE.changeProperty("amount", convertAmountToString);
            OE.changeProperty("toCalculateInflation", value => Boolean(value));

            return OE.getResult();

        }) as AllTransactions;
    }

    async getAllDates(): Promise<Dates> {
        const dates = await TransactionModel.getAllDates();
        return dates.reduce((acc, curr) => ({
            ...acc,
            [new Date(curr.date).getFullYear()]: Array.from(new Set(
                !acc[new Date(curr.date).getFullYear()]
                    ? [ new Date(curr.date).getMonth() ]
                    : [
                        ...acc[new Date(curr.date).getFullYear()],
                        new Date(curr.date).getMonth()
                    ]
            ))
        }), {});
    }

    async getCount(filter: TransactionFilter): Promise<number> {
        const numberOfTransactionsQuery = TransactionModel.getCount(filter.note);
        const result = (await numberOfTransactionsQuery.whereBetween(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, makeDateSearchOptions(filter.year, filter.month)))[0].count;
        console.info(`Получено количество записей таблицы "${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}"`);
        return result;
    }

    async add(transaction: AddTransactionDTO): Promise<number> {
        const date = transaction.date;
        const sourceOfTransactionId = transaction.sourceOfTransactionId;
        const transactionAddressId = transaction.transactionAddressId;
        const spendingCategoryId = transaction.spendingCategoryId;
        const noteId = (await NoteService.findOrAdd(transaction.note)).id;
        const amount = convertAmountToNumber(transaction.amount);
        const transactionType = transaction.transactionType;
        const toCalculateInflation = transaction.toCalculateInflation;

        const sourceOfTransaction = await DistributionModel.getOne(sourceOfTransactionId);
        const transactionAddress = await DistributionModel.getOne(transactionAddressId);

        const addingTransaction = new AddingTransaction(transaction, sourceOfTransaction, transactionAddress);
        addingTransaction.check();

        const transactionId = await TransactionModel.add({
            date,
            sourceOfTransactionId,
            transactionAddressId,
            spendingCategoryId,
            noteId,
            amount,
            transactionType,
            toCalculateInflation
        });
        console.info(`В таблицу "${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}" добавлена транзакция`);

        addingTransaction.realize();

        return transactionId;
    }

    async edit(transaction: EditTransactionDTO): Promise<boolean> {
        const id = transaction.id;
        const date = transaction.date;
        const sourceOfTransactionId = transaction.sourceOfTransactionId;
        const transactionAddressId = transaction.transactionAddressId;
        const spendingCategoryId = transaction.spendingCategoryId;
        const amount = convertAmountToNumber(transaction.amount);
        const transactionType = transaction.transactionType;
        const toCalculateInflation = transaction.toCalculateInflation;

        const sourceOfTransaction = await DistributionModel.getOne(sourceOfTransactionId);
        const transactionAddress = await DistributionModel.getOne(transactionAddressId);

        const oldTransaction = await TransactionModel.getOne(id);
        const oldSourceOfTransaction = await DistributionModel.getOne(oldTransaction.sourceOfTransactionId);
        const oldTransactionAddress = await DistributionModel.getOne(oldTransaction.transactionAddressId);

        const editingTransaction = new EditingTransaction(
            transaction,
            oldTransaction,

            sourceOfTransaction,
            transactionAddress,

            oldSourceOfTransaction,
            oldTransactionAddress
        );
        editingTransaction.check();

        const noteBeforeEditing = (await TransactionModel.getNotes(id))[0];
        const noteForEditing = await NoteService.findOrAdd(transaction.note);

        const isSuccess = Boolean(await TransactionModel.edit({
            id,
            date,
            sourceOfTransactionId,
            transactionAddressId,
            spendingCategoryId,
            noteId: noteForEditing.id,
            amount,
            transactionType,
            toCalculateInflation
        }));
        console.info(`Запись #${transaction.id} в таблице "${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}" отредактирована`);

        if (noteBeforeEditing.name !== noteForEditing.name) {
            await NoteService.deleteExtraNote(noteBeforeEditing.id, noteBeforeEditing.name);
        }

        await editingTransaction.realize();

        return isSuccess;
    }

    async delete(transaction: DeleteTransactionDTO): Promise<boolean> {
        const sourceOfTransaction = await DistributionModel.getOne(transaction.sourceOfTransactionId);
        const transactionAddress = await DistributionModel.getOne(transaction.transactionAddressId);

        const deletingTransaction = new DeletingTransaction(transaction, sourceOfTransaction, transactionAddress);
        deletingTransaction.check();

        const noteBeforeDeleting = (await TransactionModel.getNotes(transaction.id))[0];

        const isSuccess = Boolean(await TransactionModel.delete(transaction.id));
        console.info(`Запись #${transaction.id} удалена из таблицы "${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}"`);

        await NoteService.deleteExtraNote(noteBeforeDeleting.id, noteBeforeDeleting.name);

        await deletingTransaction.realize();

        return isSuccess;
    }

}

export default new TransactionService();

type AllTransactions = {
    id: number
    date: Date
    sourceOfTransactionId: number
    sourceOfTransactionName: string,
    sourceOfTransactionDeleted: boolean,
    transactionAddressId: number,
    transactionAddressName: string,
    spendingCategoryId: number,
    spendingCategoryName: string,
    spendingCategoryDeleted: boolean,
    note: string,
    amount: string,
    transactionType: string
    toCalculateInflation: boolean
}[]

type Dates = {
    [key: string]: number[]
}
