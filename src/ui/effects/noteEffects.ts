import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getNotesFx = createEffect<string, INote[]>(async substring => {
    if (substring === '') {
        return [];
    }

    const result = await window.electron.getNotes(substring);

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;
});
