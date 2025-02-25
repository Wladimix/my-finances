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
