import Transaction from '../entities/Transaction';

import { makeError } from '../utils';

class TransactionController {

    async getAllTransactions(filter: { year: string | null }): Promise<ResponceData<ITransaction[]>> {
        try {

            // TODO: удалить
            console.log(filter);

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

    async getAllYears(): Promise<ResponceData<number[]>> {
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

    async addTransaction(date: Date): Promise<ResponceData<null>> {
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

    async editTransactionDate({ id, date }: { id: number, date: Date }) {
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

}

export default new TransactionController();
