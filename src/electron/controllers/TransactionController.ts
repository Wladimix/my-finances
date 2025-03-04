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

            const errorMessage = makeError(error as Error, 'ошибка редактирования даты транзакции');

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
