import { addAccountFx, editAccountAmountFx, editAccountNameFx, getAllAccountsFx } from '../effects/accountEffects';
import { createEvent, createStore, sample } from 'effector';

export const getAllAccounts = createEvent<void>();
export const addAccount = createEvent<void>();

export const editAccountName = createEvent<{ id: number, name: string }>();
export const editAccountAmount = createEvent<{ id: number, amount: number }>();

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
