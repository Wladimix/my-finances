import { createEvent, createStore } from 'effector';

export const changeTransactionId = createEvent<number>();
export const changeNote = createEvent<string | null>();
export const changeSearchInputValue = createEvent<string | null>();
export const changeCalculateStatisticFlag = createEvent<0 | 1>();
export const changeCalculateInflationFlag = createEvent<0 | 1>();

export const $transactionId = createStore<number>(0);
export const $note = createStore<string | null>(null);
export const $searchInputValue = createStore<string | null>(null);
export const $calculateStatisticFlag = createStore<0 | 1>(1);
export const $calculateInflationFlag = createStore<0 | 1>(0);

$transactionId.on(changeTransactionId, (_, newId) => newId);
$note.on(changeNote, (_, newNote) => newNote);
$searchInputValue.on(changeSearchInputValue, (_, newValue) => newValue);
$calculateStatisticFlag.on(changeCalculateStatisticFlag, (_, newValue) => newValue);
$calculateInflationFlag.on(changeCalculateInflationFlag, (_, newValue) => newValue);
