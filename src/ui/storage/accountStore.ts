import { addAccountFx, editAccountAmountFx, editAccountDeletionFieldFx, editAccountNameFx, getAllAccountsFx } from '../effects/accountEffects';
import { createEvent, createStore, sample } from 'effector';
import { deleteTransaction, editSourceOfTransaction, editTransactionAddress, editTransactionAmount, getAllTransations } from './transactionStore';
import { deleteTransactionFx, editSourceOfTransactionFx, editTransactionAddressFx, editTransactionAmountFx } from '../effects/transactionEffects';

export const getAllAccounts = createEvent<void>();
export const addAccount = createEvent<void>();

export const editAccountName = createEvent<{ id: number, name: string }>();
export const editAccountAmount = createEvent<{ id: number, amount: number }>();
export const editAccountDeletionField = createEvent<{ id: number, isDeleted: 0 | 1 }>();

export const changeName = createEvent<string>();
export const changeAmount = createEvent<number>();

export const $allAccounts = createStore<IAccount[]>([]);
export const $name = createStore<string>('');
export const $amount = createStore<number>(0.00);

$name.on(changeName, (_, newName) => newName);
$amount.on(changeAmount, (_, newAmount) => newAmount);

// getAllAccounts ------------------------
sample({
    clock: getAllAccounts,
    target: getAllAccountsFx
});

sample({
    clock: getAllAccountsFx.doneData,
    target: $allAccounts
});

sample({
    clock: getAllAccountsFx.done,
    target: getAllTransations
});
// ---------------------------------------

// addAccount ----------------------------
sample({
    clock: addAccount,
    target: addAccountFx
});

sample({
    clock: addAccountFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// editAccountName -----------------------
sample({
    clock: editAccountName,
    target: editAccountNameFx
});

sample({
    clock: editAccountNameFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// editAccountAmount ---------------------
sample({
    clock: editAccountAmount,
    target: editAccountAmountFx
});

sample({
    clock: editAccountAmountFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// editAccountDeletionField --------------
sample({
    clock: editAccountDeletionField,
    target: editAccountDeletionFieldFx
});

sample({
    clock: editAccountDeletionFieldFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// editSourceOfTransaction ---------------
sample({
    clock: editSourceOfTransaction,
    target: editSourceOfTransactionFx
});

sample({
    clock: editSourceOfTransactionFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// editTransactionAddress ----------------
sample({
    clock: editTransactionAddress,
    target: editTransactionAddressFx
});

sample({
    clock: editTransactionAddressFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// editTransactionAmount -----------------
sample({
    clock: editTransactionAmount,
    target: editTransactionAmountFx
});

sample({
    clock: editTransactionAmountFx.done,
    target: getAllAccounts
});
// ---------------------------------------

// deleteTransaction ---------------------
sample({
    clock: deleteTransaction,
    target: deleteTransactionFx
});

sample({
    clock: deleteTransactionFx.done,
    target: getAllAccounts
});
// ---------------------------------------
