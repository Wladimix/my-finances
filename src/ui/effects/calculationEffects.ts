import { createEffect } from 'effector';
import { showErrorNotification } from '../utils';

export const getYearlyTotalAmountFx = createEffect<{ year: string | null }, ITotalAmount>( async data => {

    const defaultValue = {
        totalIncomeAmount: 0,
        totalExpensditureAmount: 0,
        savings: 0
    };

    if (data.year === null) {
        return defaultValue;
    }

    const result = await window.electron.getTotalAmount({ year: data.year, month: null });

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return defaultValue;
    }

    return result.data;

});

export const getMonthlyTotalAmountFx = createEffect<{ year: string | null, month: string | null }, ITotalAmount>( async data => {

    const defaultValue = {
        totalIncomeAmount: 0,
        totalExpensditureAmount: 0,
        savings: 0
    };

    if (data.year === null || data.month === null) {
        return defaultValue;
    }

    const result = await window.electron.getTotalAmount({ year: data.year, month: data.month });

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return defaultValue;
    }

    return result.data;

});

export const getYearlyStatisticsOnExpensesFx = createEffect<{ year: string | null }, IStatisticsOfExpenses[]>( async data => {

    if (data.year === null) {
        return [];
    }

    const result = await window.electron.getStatisticsOnExpenses({ year: data.year, month: null });

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;

});

export const getMonthlyStatisticsOnExpensesFx = createEffect<{ year: string | null, month: string | null }, IStatisticsOfExpenses[]>( async data => {

    if (data.year === null || data.month === null) {
        return [];
    }

    const result = await window.electron.getStatisticsOnExpenses({ year: data.year, month: data.month });

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return [];
    }

    return result.data;

});

export const getInflationFx = createEffect<string | null, IInflationData>(async year => {

    if (!year) {
        return {
            averageCost: {},
            inflation: {}
        };
    }

    const result = await window.electron.getInflation(year);

    if (result.error) {
        showErrorNotification(result.error);
    }

    if (!result.data) {
        return {
            averageCost: {},
            inflation: {}
        };
    }

    return result.data;

});
