import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const addAccountFx = createEffect(async () => {
    const result = await window.electron.addAccount();

    if (result.error) {
        showErrorNotification(result.error);
    }
});
