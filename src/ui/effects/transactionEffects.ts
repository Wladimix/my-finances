import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getAllTransactionsFx = createEffect<IFilter, ITransaction[]>(async filter => {
    const result = await window.electron.getAllTransactions({
        year: filter.year,
        month: filter.month,
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
    const numberOfTransactions = await window.electron.getNumberOfTransactions({ year: filter.year, month: filter.month });

    if (numberOfTransactions.error) {
        showErrorNotification(numberOfTransactions.error);
    }

    if (!numberOfTransactions.data) {
        return 1;
    }

    const numberOfPages = Math.ceil(numberOfTransactions.data / 30);

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

export const deleteTransactionFx = createEffect<number, void>(async id => {
    const result = await window.electron.deleteTransaction(id);

    if (result.error) {
        showErrorNotification(result.error);
    }
});
