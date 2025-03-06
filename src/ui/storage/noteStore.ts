import { createEvent, createStore } from 'effector';

export const changeTransactionId = createEvent<number>();
export const changeNote = createEvent<string | null>();

export const $transactionId = createStore<number>(0);
export const $note = createStore<string | null>(null);

$transactionId.on(changeTransactionId, (_, newId) => newId);
$note.on(changeNote, (_, newNote) => newNote);
