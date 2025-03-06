import { $currentPage, $numberOfPages } from './paginationStore';
import { $selectedMonth, $selectedYear, changeMonth, changeYear, getAllYears, resetYear } from './dateStore';
import { addTransactionFx, deleteTransactionFx, editSourceOfTransactionFx, editSpendingCategoryFx, editTransactionAddressFx, editTransactionAmountFx, editTransactionDateFx, getAllTransactionsFx, getNumberOfPagesFx } from '../effects/transactionEffects';
import { createEvent, createStore, sample } from 'effector';

export const getAllTransations = createEvent();
export const getNumberOfTransactions = createEvent();
export const addTransaction = createEvent<Date>();
export const deleteTransaction = createEvent<number>();

export const editTransactionDate = createEvent<{ id: number, date: Date }>();
export const editSourceOfTransaction = createEvent<{ id: number, sourceOfTransactionId: number | null }>();
export const editTransactionAddress = createEvent<{ id: number, transactionAddressId: number | null }>();
export const editSpendingCategory = createEvent<{ id: number, spendingCategoryId: number | null }>();
export const editTransactionAmount = createEvent<{ id: number, amount: number }>();

export const changeAmount = createEvent<number>();

export const $allTransactions = createStore<ITransaction[]>([]);
export const $amount = createStore<number>(0.00);

$amount.on(changeAmount, (_, newAmount) => newAmount);

// getAllTransations ---------------------
sample({
    clock: getAllTransations,
    target: getNumberOfTransactions
});

sample({
    clock: getNumberOfTransactions,
    source: { year: $selectedYear, month: $selectedMonth },
    target: getNumberOfPagesFx
});

sample({
    clock: getNumberOfPagesFx.doneData,
    target: $numberOfPages
});

sample({
    clock: getNumberOfPagesFx.done,
    source: { year: $selectedYear, month: $selectedMonth, page: $currentPage },
    target: getAllTransactionsFx
});

sample({
    clock: getAllTransactionsFx.doneData,
    target: $allTransactions
});

sample({
    clock: getAllTransactionsFx.done,
    target: getAllYears
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

// editSpendingCategory ------------------
sample({
    clock: editSpendingCategory,
    target: editSpendingCategoryFx
});

sample({
    clock: editSpendingCategoryFx.done,
    target: getAllTransations
});
// ---------------------------------------

// changeYear ----------------------------
sample({
    clock: changeYear,
    target: getAllTransations
});
// ---------------------------------------

// resetYear -----------------------------
sample({
    clock: resetYear,
    target: getAllTransations
});
// ---------------------------------------

// changeMonth ---------------------------
sample({
    clock: changeMonth,
    target: getAllTransations
});
// ---------------------------------------

// deleteTransaction ---------------------
sample({
    clock: deleteTransaction,
    target: deleteTransactionFx
});

sample({
    clock: deleteTransactionFx.done,
    target: getAllTransations
});
// ---------------------------------------
