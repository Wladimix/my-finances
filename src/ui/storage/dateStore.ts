import { createEvent, createStore, sample } from 'effector';
import { getAllYearsFx } from '../effects/transactionEffects';

export const getAllYears = createEvent();

export const changeYear = createEvent<string | null>();
export const resetYear = createEvent();
export const changeMonth = createEvent<string | null>();

export const $allYears = createStore<number[]>([]);
export const $selectedYear = createStore<string | null>(null);
export const $selectedMonth = createStore<string | null>(null);

$selectedYear.on(changeYear, (_, newYear) => newYear);
$selectedYear.reset(resetYear);

$selectedMonth.on(changeMonth, (_, newMonth) => newMonth);

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
    filter: ({ allYears, selectedYear }) => selectedYear !== null && !allYears.includes(Number(selectedYear)),
    target: resetYear
});
// ---------------------------------------
