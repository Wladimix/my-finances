import { addAccountFx } from '../effects/accountEffects';
import { createEvent, sample } from 'effector';

export const addAccount = createEvent();

sample({
    clock: addAccount,
    target: addAccountFx
});
