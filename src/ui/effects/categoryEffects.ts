import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getAllCategoriesFx = createEffect<void, ICategory[]>(async () => {
    const result = await window.electron.getAllCategories();

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;
});

export const addCategoryFx = createEffect<void, void>(async () => {
    const result = await window.electron.addCategory();

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editCategoryNameFx = createEffect<{ id: number, name: string }, void>(async data => {
    const result = await window.electron.editCategoryName({ id: data.id, name: data.name })

    if (result.error) {
        showErrorNotification(result.error);
    }
});

export const editCategoryDeletionFieldFx = createEffect<{ id: number, isDeleted: 0 | 1 }, void>(async data => {
    const result = await window.electron.editCategoryDeletionField({ id: data.id, isDeleted: data.isDeleted })

    if (result.error) {
        showErrorNotification(result.error);
    }
});
