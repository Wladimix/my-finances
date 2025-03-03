import { createEvent, createStore, sample } from 'effector';
import { getAllYearsFx } from '../effects/transactionEffects';

export const getAllYears = createEvent();

export const $allYears = createStore<number[]>([]);

// getAllYears ---------------------------
sample({
    clock: getAllYears,
    target: getAllYearsFx
});

sample({
    clock: getAllYearsFx.doneData,
    target: $allYears
});
// ---------------------------------------
