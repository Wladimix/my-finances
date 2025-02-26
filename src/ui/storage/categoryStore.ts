import { addCategoryFx, editCategoryDeletionFieldFx, editCategoryNameFx, getAllCategoriesFx } from '../effects/categoryEffects';
import { createEvent, createStore, sample } from 'effector';

export const getAllCategories = createEvent<void>();
export const addCategory = createEvent<void>();

export const editCategoryName = createEvent<{ id: number, name: string }>();
export const editCategoryDeletionField = createEvent<{ id: number, isDeleted: 0 | 1 }>();

export const changeName = createEvent<string>();

export const $allCategories = createStore<ICategory[]>([]);
export const $name = createStore<string>('');

$name.on(changeName, (_, newName) => newName);

// getAllCategories ----------------------
sample({
    clock: getAllCategories,
    target: getAllCategoriesFx
});

sample({
    clock: getAllCategoriesFx.doneData,
    target: $allCategories
});
// ---------------------------------------

// addCategory ---------------------------
sample({
    clock: addCategory,
    target: addCategoryFx
});

sample({
    clock: addCategoryFx.doneData,
    target: getAllCategories
});
// ---------------------------------------

// editCategoryName ----------------------
sample({
    clock: editCategoryName,
    target: editCategoryNameFx
});

sample({
    clock: editCategoryNameFx.done,
    target: getAllCategories
});
// ---------------------------------------

// editCategoryDeletionField -------------
sample({
    clock: editCategoryDeletionField,
    target: editCategoryDeletionFieldFx
});

sample({
    clock: editCategoryDeletionFieldFx.done,
    target: getAllCategories
});
// ---------------------------------------
