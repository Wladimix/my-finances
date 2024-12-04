import ErrorHandling from "../lib/ErrorHandling"
import TransactionService from "./TransactionService"

import { RequestStatuses } from "../constants"

class TransactionController {

    async getAllTransactions(filter: TransactionFilter): Promise<ResponceData<GetTransactionDTO[]>> {
        try {
            const allTransactions = await TransactionService.getAll(filter);

            return {
                data: allTransactions,
                status: RequestStatuses.SUCCESS,
                message: "Получены финансовые транзакции"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка получения финансовых транзакций")
            }
        }
    }

    async getAllTransactionDates(): Promise<ResponceData<GetDatesDTO>> {
        try {
            const allDates = await TransactionService.getAllDates();

            return {
                data: allDates,
                status: RequestStatuses.SUCCESS,
                message: "Получены даты транзакций"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка получения дат транзакций")
            }
        }
    }

    async getNumberOfTransactions(filter: TransactionFilter): Promise<ResponceData<number>> {
        try {
            const numberOfTransactions = await TransactionService.getCount(filter);

            return {
                data: numberOfTransactions,
                status: RequestStatuses.SUCCESS,
                message: "Получено количество транзакций"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка получения количества транзакций")
            }
        }
    }

    async addTransaction(transaction: AddTransactionDTO): Promise<ResponceData<number>> {
        try {
            const transactionId = await TransactionService.add(transaction);

            return {
                data: transactionId,
                status: RequestStatuses.SUCCESS,
                message: "Добавлена финансовая транзакция"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка добавления финансовой транзакции")
            }
        }
    }

    async editTransaction(transaction: EditTransactionDTO): Promise<ResponceData<boolean>> {
        try {
            const isSuccess = await TransactionService.edit(transaction);

            return {
                data: isSuccess,
                status: RequestStatuses.SUCCESS,
                message: "Отредактирована финансовая транзакция"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка редактирования финансовой транзакции")
            }
        }
    }

    async deleteTransaction(transaction: DeleteTransactionDTO): Promise<ResponceData<boolean>> {
        try {
            const isSuccess = await TransactionService.delete(transaction);

            return {
                data: isSuccess,
                status: RequestStatuses.SUCCESS,
                message: "Удалена финансовая транзакция"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка удаления финансовой транзакции")
            }
        }

    }

}

export default new TransactionController();
