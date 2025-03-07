import Transaction from '../entities/Transaction';

import { makeError } from '../utils';

export default class TransactionController {

    static async getAllTransactions(filter: IFilter): Promise<ResponceData<ITransaction[]>> {
        try {

            const transaction = new Transaction();

            return {
                data: await transaction.getAll(filter),
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения транзакций');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async getAllYears(): Promise<ResponceData<number[]>> {
        try {

            const transaction = new Transaction();

            return {
                data: await transaction.getYears(),
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения годов');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async getNumberOfTransactions(filter: IFilter): Promise<ResponceData<number>> {
        try {

            const transaction = new Transaction();

            return {
                data: await transaction.getCount(filter),
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения количества транзакций');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async addTransaction(date: Date): Promise<ResponceData<null>> {
        try {

            const transaction = new Transaction();
            await transaction.add(date);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка добавления транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editTransactionDate({ id, date }: { id: number, date: Date }) {
        try {

            const transaction = new Transaction(id);
            await transaction.editDate(date);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования даты транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editSourceOfTransaction({ id, sourceOfTransactionId }: { id: number, sourceOfTransactionId: number | null }) {
        try {

            const transaction = new Transaction(id);
            await transaction.editSourceOfTransactionId(sourceOfTransactionId);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования источника транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editTransactionAddress({ id, transactionAddressId }: { id: number, transactionAddressId: number | null }) {
        try {

            const transaction = new Transaction(id);
            await transaction.editTransactionAddressId(transactionAddressId);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования адреса транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editSpendingCategory({ id, spendingCategoryId }: { id: number, spendingCategoryId: number | null }) {
        try {

            const transaction = new Transaction(id);
            await transaction.editSpendingCategoryId(spendingCategoryId);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования категории расхода транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editTransactionNote({ id, note }: { id: number, note: string | null }): Promise<ResponceData<null>> {
        try {

            const transaction = new Transaction(id);
            await transaction.editNote(note);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования примечания транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editTransactionAmount({ id, amount }: { id: number, amount: number }): Promise<ResponceData<null>> {
        try {

            const transaction = new Transaction(id);
            await transaction.editAmount(amount);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования суммы транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async changeCalculateStatisticFlag({ id, flag }: { id: number, flag: 0 | 1 }): Promise<ResponceData<null>> {
        try {

            const transaction = new Transaction(id);
            await transaction.changeCalculateStatisticFlag(flag);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка изменения флага расчёта статистики');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async changeCalculateInflationFlag({ id, flag }: { id: number, flag: 0 | 1 }): Promise<ResponceData<null>> {
        try {

            const transaction = new Transaction(id);
            await transaction.changeCalculateInflationFlag(flag);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка изменения флага расчёта инфляции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async deleteTransaction(id: number) {
        try {

            const transaction = new Transaction(id);
            await transaction.delete();

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка удаления транзакции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

}
