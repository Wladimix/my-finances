import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getAllTransactionsFx = createEffect<void, ITransaction[]>(async () => {
    const result = await window.electron.getAllTransactions();

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
