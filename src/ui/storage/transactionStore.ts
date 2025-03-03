import { addTransactionFx, editTransactionDateFx, getAllTransactionsFx } from '../effects/transactionEffects';
import { createEvent, createStore, sample } from 'effector';
import { getAllYears } from './dateStore';

export const getAllTransations = createEvent();
export const addTransaction = createEvent<Date>();

export const editTransactionDate = createEvent<{ id: number, date: Date }>();

export const $allTransactions = createStore<ITransaction[]>([]);

// getAllTransations ---------------------
sample({
    clock: getAllTransations,
    target: getAllTransactionsFx
});

sample({
    clock: getAllTransactionsFx.doneData,
    target: $allTransactions
});

sample({
    clock: getAllTransactionsFx.done,
    target: getAllYears
})
// ---------------------------------------

// addTransaction ------------------------
sample({
    clock: addTransaction,
    target: addTransactionFx
});

sample({
    clock: addTransactionFx.done,
    target: getAllTransations
});
// ---------------------------------------

// editTransactionDate -------------------
sample({
    clock: editTransactionDate,
    target: editTransactionDateFx
});

sample({
    clock: editTransactionDateFx.done,
    target: getAllTransations
});
// ---------------------------------------
