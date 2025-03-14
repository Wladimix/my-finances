import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getAllAccountsFx = createEffect<void, IAccount[]>(async () => {
    const result = await window.electron.getAllAccounts();

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;
});

export const addAccountFx = createEffect<void, void>(async () => {
    const result = await window.electron.addAccount();

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editAccountNameFx = createEffect<{ id: number, name: string }, void>(async data => {
    const result = await window.electron.editAccountName({ id: data.id, name: data.name });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editAccountAmountFx = createEffect<{ id: number, amount: number }, void>(async data => {
    const result = await window.electron.editAccountAmount({ id: data.id, amount: data.amount });

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editAccountDeletionFieldFx = createEffect<{ id: number, isDeleted: 0 | 1 }, void>(async data => {
    const result = await window.electron.editAccountDeletionField({ id: data.id, isDeleted: data.isDeleted });

    if (result.error) {
        showErrorNotification(result.error);
    }
});
