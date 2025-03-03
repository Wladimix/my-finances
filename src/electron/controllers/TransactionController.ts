import Transaction from '../entities/Transaction';

import { makeError } from '../utils';

class TransactionController {

    async getAllTransactions(): Promise<ResponceData<ITransaction[]>> {
        try {

            const transaction = new Transaction();

            return {
                data: await transaction.getAll(),
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

}

export default new TransactionController();
