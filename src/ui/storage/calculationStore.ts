import { createEvent, createStore, sample } from 'effector';
import { getMonthlyTotalAmountFx, getYearlyTotalAmountFx } from '../effects/calculationEffects';
import { $selectedMonth, $selectedYear } from './dateStore';

export const getYearlyTotalAmount = createEvent();
export const getMonthlyTotalAmount = createEvent();

export const $yearlyTotalAmount = createStore<ITotalAmount>({
    totalIncomeAmount: 0,
    totalExpensditureAmount: 0,
    savings: 0
});

export const $monthlyTotalAmount = createStore<ITotalAmount>({
    totalIncomeAmount: 0,
    totalExpensditureAmount: 0,
    savings: 0
});

// getYearlyTotalAmount ------------------
sample({
    clock: getYearlyTotalAmount,
    source: { year: $selectedYear },
    target: getYearlyTotalAmountFx
});

sample({
    clock: getYearlyTotalAmountFx.doneData,
    target: $yearlyTotalAmount
});
// ---------------------------------------

// getMonthlyTotalAmount -----------------
sample({
    clock: getMonthlyTotalAmount,
    source: { year: $selectedYear, month: $selectedMonth },
    target: getMonthlyTotalAmountFx
});

sample({
    clock: getMonthlyTotalAmountFx.doneData,
    target: $monthlyTotalAmount
});
// ---------------------------------------
