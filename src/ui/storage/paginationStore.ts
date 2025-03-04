import { createEvent, createStore } from 'effector';

export const changePage = createEvent<number>();

export const $numberOfPages = createStore<number>(1);
export const $currentPage = createStore<number>(0);

$currentPage.on(changePage, (_, newPage) => newPage);
