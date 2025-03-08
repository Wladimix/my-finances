import TransactionModel from '../models/TransactionModel';

import { TransactionTypes } from '../constants';

export async function getTotalAmount(year: string, month: string | null): Promise<ITotalAmount> {

    const totalIncomeAmount = (await TransactionModel.getTotalAmountByType(year, month, TransactionTypes.INCOME))[0].amount;
    const totalExpensditureAmount = (await TransactionModel.getTotalAmountByType(year, month, TransactionTypes.EXPENDITURE))[0].amount;

    return {
        totalIncomeAmount,
        totalExpensditureAmount,
        savings: totalIncomeAmount - totalExpensditureAmount
    };

}

export async function getStatisticsOnExpenses(year: string, month: string | null): Promise<IStatisticsOfExpenses[]> {
    return await TransactionModel.getAmountOfExpensesByCategories(year, month);
}
