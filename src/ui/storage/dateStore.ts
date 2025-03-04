import { createEvent, createStore, sample } from 'effector';
import { getAllYearsFx } from '../effects/transactionEffects';

export const getAllYears = createEvent();

export const changeYear = createEvent<string | null>();
export const resetYear = createEvent();

export const $allYears = createStore<number[]>([]);
export const $selectedYear = createStore<string | null>(null);

$selectedYear.on(changeYear, (_, newYear) => newYear);
$selectedYear.reset(resetYear);

// getAllYears ---------------------------
sample({
    clock: getAllYears,
    target: getAllYearsFx
});

sample({
    clock: getAllYearsFx.doneData,
    target: $allYears
});

sample({
    clock: getAllYearsFx.done,
    source: { allYears: $allYears, selectedYear: $selectedYear },
    filter: ({ allYears, selectedYear }) => {
        return selectedYear !== null && !allYears.includes(Number(selectedYear));
    },
    target: resetYear
});
// ---------------------------------------
