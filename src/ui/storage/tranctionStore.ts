import { createEvent, createStore, sample } from 'effector';
import { getAllTransactionsFx } from '../effects/transactionEffects';

export const getAllTransations = createEvent();

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
