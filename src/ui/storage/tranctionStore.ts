import { addTransactionFx, getAllTransactionsFx } from '../effects/transactionEffects';
import { createEvent, createStore, sample } from 'effector';

export const getAllTransations = createEvent();
export const addTransaction = createEvent<Date>();

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
