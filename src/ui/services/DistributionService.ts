import TransactionService from './Transaction/TransactionService'

import { checkAmount, showNotification } from '../lib/utils'
import { dataState } from '../storage/dataSlice'
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { setDistributionTypes } from "../storage/dataSlice"

export default class DistributionService {

    private dispatch;

    constructor(dispatch: ThunkDispatch<{ data: dataState }, undefined, UnknownAction> & Dispatch<UnknownAction>) {
        this.dispatch = dispatch;
    }

    async loadDistributionTypes(): Promise<void> {
        const distributionTypes = await window.electron.getAllDistributionTypes();
        showNotification(distributionTypes, { onlyErrorChecking: true });
        this.dispatch(setDistributionTypes(distributionTypes.data));
    }

    async addDistributionType(name: string, amount: string): Promise<void> {
        const distributionType: AddDistributionTypeDTO = { name, amount };

        const resultAdding = await window.electron.addDistributionType(distributionType);
        showNotification(resultAdding);

        this.loadDistributionTypes();
    }

    async editDistributionType(id: number, name: string, amount: string, filter: TransactionFilter) {
        const distributionType: EditDistributionTypeDTO = { id, name, amount };

        const resultEditing = await window.electron.editDistributionType(distributionType);
        showNotification(resultEditing);

        this.loadDistributionTypes();
        await new TransactionService(this.dispatch).loadTransactions(filter);
    }

    async deleteDistributionType(id: number, name: string, amount: string, filter: TransactionFilter) {
        const distributionType: DeleteDistributionTypeDTO = { id, name, amount };

        const resultDeleting = await window.electron.deleteDistributionType(distributionType);
        showNotification(resultDeleting);

        this.loadDistributionTypes();
        await new TransactionService(this.dispatch).loadTransactions(filter);
    }

    checkDistributionType(name: string, amount: string): boolean {
        return Boolean(name) && checkAmount(amount);
    }

}
