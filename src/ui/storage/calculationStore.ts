import { $selectedMonth, $selectedYear } from './dateStore';
import { createEvent, createStore, sample } from 'effector';
import { getMonthlyStatisticsOnExpensesFx, getMonthlyTotalAmountFx, getYearlyStatisticsOnExpensesFx, getYearlyTotalAmountFx } from '../effects/calculationEffects';

export const getYearlyTotalAmount = createEvent();
export const getMonthlyTotalAmount = createEvent();

export const getYearlyStatisticsOnExpenses = createEvent();
export const getMonthlyStatisticsOnExpenses = createEvent();

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

export const $yearlyStatisticsOnExpenses = createStore<IStatisticsOfExpenses[]>([]);
export const $monthlyStatisticsOnExpenses = createStore<IStatisticsOfExpenses[]>([]);

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

// getYearlyStatisticsOnExpenses ---------
sample({
    clock: getYearlyStatisticsOnExpenses,
    source: { year: $selectedYear },
    target: getYearlyStatisticsOnExpensesFx
});

sample({
    clock: getYearlyStatisticsOnExpensesFx.doneData,
    target: $yearlyStatisticsOnExpenses
});
// ---------------------------------------

// getMonthlyStatisticsOnExpenses --------
sample({
    clock: getMonthlyStatisticsOnExpenses,
    source: { year: $selectedYear, month: $selectedMonth },
    target: getMonthlyStatisticsOnExpensesFx
});

sample({
    clock: getMonthlyStatisticsOnExpensesFx.doneData,
    target: $monthlyStatisticsOnExpenses
});
// ---------------------------------------
