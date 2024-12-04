import DistributionService from "../DistributionService"
import InflationService from "../InflationService"

import { checkAmount, showNotification } from "../../lib/utils"
import { dataState, setNotes } from "../../storage/dataSlice"
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { NOT_DEFINE } from "../../constants"
import { setTransactionLoader } from "../../storage/transactionSlice"
import { setTransactions } from "../../storage/dataSlice"
import { setDates } from "../../storage/dateSlice"

export default class TransactionService {

    private dispatch;

    constructor(dispatch: ThunkDispatch<{ data: dataState }, undefined, UnknownAction> & Dispatch<UnknownAction>) {
        this.dispatch = dispatch;
    }

    async loadTransactions(filter: TransactionFilter): Promise<void> {
        this.dispatch(setTransactionLoader(true));

        const dates = await window.electron.getAllTransactionDates();
        showNotification(dates, { onlyErrorChecking: true });
        this.dispatch(setDates(dates.data));

        const transactions = await window.electron.getAllTransactions(filter);
        showNotification(transactions, { onlyErrorChecking: true });
        this.dispatch(setTransactions(transactions.data));
        this.dispatch(setTransactionLoader(false));
    }

    async addTransaction(transaction: AddTransactionDTO, filter: TransactionFilter): Promise<void> {
        const resultAdding = await window.electron.addTransaction(transaction);
        showNotification(resultAdding);

        await this.loadTransactions(filter);
        await new DistributionService(this.dispatch).loadDistributionTypes();
        await new InflationService(this.dispatch).loadInflationData(filter.year);

        this.dispatch(setNotes([]));
    }

    async editTransaction(id: number, transaction: AddTransactionDTO, filter: TransactionFilter): Promise<void> {
        const resultEditing = await window.electron.editTransaction({ id, ...transaction });
        showNotification(resultEditing);

        await this.loadTransactions(filter);
        await new DistributionService(this.dispatch).loadDistributionTypes();
        await new InflationService(this.dispatch).loadInflationData(filter.year);

        this.dispatch(setNotes([]));
    }

    async deleteTransaction(transaction: DeleteTransactionDTO, filter: TransactionFilter) {
        const resultdeleting = await window.electron.deleteTransaction(transaction);
        showNotification(resultdeleting);

        await this.loadTransactions(filter);
        await new DistributionService(this.dispatch).loadDistributionTypes();
        await new InflationService(this.dispatch).loadInflationData(filter.year);

        this.dispatch(setNotes([]));
    }

    checkTransaction(transaction: AddTransactionDTO): boolean {
        return checkAmount(transaction.amount) && transaction.transactionType !== NOT_DEFINE;
    }

}
