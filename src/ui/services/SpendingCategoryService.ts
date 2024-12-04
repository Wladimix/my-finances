import TransactionService from "./Transaction/TransactionService"

import { dataState } from "../storage/dataSlice"
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { setCategories } from "../storage/dataSlice"
import { showNotification } from "../lib/utils"

export default class SpendingCategoryService {

    private dispatch;

    constructor(dispatch: ThunkDispatch<{ data: dataState }, undefined, UnknownAction> & Dispatch<UnknownAction>) {
        this.dispatch = dispatch;
    }

    async loadSpendingCategories(): Promise<void> {
        const spendingCategories = await window.electron.getAllCategories();
        showNotification(spendingCategories, { onlyErrorChecking: true });
        this.dispatch(setCategories(spendingCategories.data));
    }

    async addSpendingCategory(name: string): Promise<void> {
        const spendingCategory: AddSpendingCategoryDTO = { name };

        const resultAdding = await window.electron.addSpendingCategory(spendingCategory);
        showNotification(resultAdding);

        this.loadSpendingCategories();
    }

    async editSpendingCategory(id: number, name: string, filter: TransactionFilter) {
        const spendingCategory: EditSpendingCategoryDTO = { id, name };

        const resultEditing = await window.electron.editSpendingCategory(spendingCategory);
        showNotification(resultEditing);

        this.loadSpendingCategories();
        await new TransactionService(this.dispatch).loadTransactions(filter);
    }

    async deleteSpendingCategory(id: number, name: string, filter: TransactionFilter) {
        const spendingCategory: DeleteSpendingCategoryDTO = { id, name };

        const resultDeleting = await window.electron.deleteSpendingCategory(spendingCategory);
        showNotification(resultDeleting);

        this.loadSpendingCategories();
        await new TransactionService(this.dispatch).loadTransactions(filter);
    }

    checkSpendingCategory(name: string): boolean {
        return Boolean(name);
    }

}
