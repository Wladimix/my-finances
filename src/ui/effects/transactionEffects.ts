import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getAllTransactionsFx = createEffect<IFilter, ITransaction[]>(async filter => {
    const result = await window.electron.getAllTransactions({
        year: filter.year,
        month: filter.month,
        note: filter.note,
        page: filter.page !== undefined ? filter.page : 0
    });

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;
});

export const getAllYearsFx = createEffect<void ,number[]>( async () => {
    const result = await window.electron.getAllYears();

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;
});

export const getNumberOfPagesFx = createEffect<IFilter, number>(async filter => {
    const numberOfTransactions = await window.electron.getNumberOfTransactions({
        year: filter.year,
        month: filter.month,
        note: filter.note
    });

    if (numberOfTransactions.error) {
        showErrorNotification(numberOfTransactions.error);
    }

    if (!numberOfTransactions.data) {
        return 1;
    }

    const numberOfPages = Math.ceil(numberOfTransactions.data / 3);

    return numberOfPages;
});

export const addTransactionFx = createEffect<Date, void>(async date => {
    const result = await window.electron.addTransaction(date);

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editTransactionDateFx = createEffect<{ id: number, date: Date }, void>(async data => {
    const result = await window.electron.editTransactionDate({ id: data.id, date: data.date });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editSourceOfTransactionFx = createEffect<{ id: number, sourceOfTransactionId: number | null }, void>(async data => {
    const result = await window.electron.editSourceOfTransaction({ id: data.id, sourceOfTransactionId: data.sourceOfTransactionId });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editTransactionAddressFx = createEffect<{ id: number, transactionAddressId: number | null }, void>(async data => {
    const result = await window.electron.editTransactionAddress({ id: data.id, transactionAddressId: data.transactionAddressId });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editSpendingCategoryFx = createEffect<{ id: number, spendingCategoryId: number | null }, void>(async data => {
    const result = await window.electron.editSpendingCategory({ id: data.id, spendingCategoryId: data.spendingCategoryId });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editTransactionNoteFx = createEffect<{ id: number, note: string | null }, void>(async data => {
    const result = await window.electron.editTransactionNote({ id: data.id, note: data.note });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editTransactionAmountFx = createEffect<{ id: number, amount: number }, void>(async data => {
    const result = await window.electron.editTransactionAmount({ id: data.id, amount: data.amount });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editCalculateStatisticFlagFx = createEffect<{ id: number, flag: 0 | 1 }, void>(async data => {
    const result = await window.electron.changeCalculateStatisticFlag({ id: data.id, flag: data.flag });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editCalculateInflationFlagFx = createEffect<{ id: number, flag: 0 | 1 }, void>(async data => {
    const result = await window.electron.changeCalculateInflationFlag({ id: data.id, flag: data.flag });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const deleteTransactionFx = createEffect<number, void>(async id => {
    const result = await window.electron.deleteTransaction(id);

    if (result.error) {
        showErrorNotification(result.error);
    }
});
