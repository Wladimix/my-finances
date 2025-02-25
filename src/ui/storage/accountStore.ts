import { addAccountFx, getAllAccountsFx } from '../effects/accountEffects';
import { createEvent, createStore, sample } from 'effector';

export const getAllAccounts = createEvent();
export const addAccount = createEvent();

export const $allAccounts = createStore<IAccount[]>([]);

sample({
    clock: getAllAccounts,
    target: getAllAccountsFx
});

sample({
    clock: getAllAccountsFx.doneData,
    target: $allAccounts
});

sample({
    clock: addAccount,
    target: addAccountFx
});

sample({
    clock: addAccountFx.doneData,
    target: getAllAccounts
});
