import DistributionModel from "../DustributionFinances/DustributionModel"
import ObjectEditing from "../lib/ObjectEditing"
import TransactionModel, { RecordForInflation } from "../Transaction/TransactionModel"

import { convertAmountToString, filterOutUniqueValues, makeDateSearchOptions } from "../lib/utils"
import { TablesNames, TransactionTypes, NOT_DEFINE, VALUE_MISSING } from '../constants'

class CalculationService {

    async getCapital(): Promise<string> {
        const capital = await DistributionModel.getSumDistributiontypes();
        return convertAmountToString(capital);
    }

    async getTotalAmount(date): Promise<TotalAmount> {
        const totalIncomeAmountQuery = TransactionModel.getTotalAmount(TransactionTypes.FINANCIAL_INCOME);
        const totalExpenceAmountQuery = TransactionModel.getTotalAmount(TransactionTypes.FINANCIAL_EXPENCE);

        const { year, month } = date;
        let totalIncomeAmount = await totalIncomeAmountQuery.whereBetween(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, makeDateSearchOptions(year, month));
        let totalExpenceAmount = await totalExpenceAmountQuery.whereBetween(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, makeDateSearchOptions(year, month));

        totalIncomeAmount = totalIncomeAmount[0].amount ?? 0;
        totalExpenceAmount = totalExpenceAmount[0].amount ?? 0;

        const totalStatistics = {
            totalIncomeAmount: convertAmountToString(totalIncomeAmount),
            totalExpenceAmount: convertAmountToString(totalExpenceAmount),
            savings: convertAmountToString(totalIncomeAmount - totalExpenceAmount)
        };
        console.info("Получена общая статистика");

        return totalStatistics;
    }

    async getStatisticsOnExpenses(date: DateDTO): Promise<AmountOfExpenses> {
        if (date.year === NOT_DEFINE) {
            return [];
        }

        const amountOfExpensesQuery = TransactionModel.getAmountOfExpensesByCategory();
        const { year, month } = date;

        const amountOfExpenses = await amountOfExpensesQuery.whereBetween(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, makeDateSearchOptions(year, month));
        console.info("Получена статистика по расходам");

        return amountOfExpenses.map(expenses =>
            new ObjectEditing(expenses).changeProperty("amount", convertAmountToString).getResult()
        ) as AmountOfExpenses;
    }

    async calculateInflation(year: number): Promise<InflationDTO> {
        const recordsForPrevYear = await TransactionModel.getRecordsForInflation(year - 1);
        const recordsForInflation = await TransactionModel.getRecordsForInflation(year);

        const notes = filterOutUniqueValues<{note: string}>(recordsForInflation, "note");
        return notes.reduce((acc, note) => {

            const uniqueNotesRecordsForPrevYear = recordsForPrevYear.filter(record => record.note === note);
            const uniqueNotesRecords = recordsForInflation.filter(record => record.note === note);

            const inflationForProduct = this.calculateInflationForEntity(uniqueNotesRecordsForPrevYear, uniqueNotesRecords);

            return inflationForProduct !== VALUE_MISSING ? { ...acc, [note]: inflationForProduct } : { ...acc };

        }, {});
    }

    calculateInflationForEntity(recordsForPrevYear: RecordForInflation[], records: RecordForInflation[]): number | typeof VALUE_MISSING {
        let firstRecord: RecordForInflation[];
        let lastrecord: RecordForInflation[];

        firstRecord = recordsForPrevYear.slice(-1);
        firstRecord = firstRecord.length ? firstRecord : records.slice(0, 1);

        lastrecord = records.slice(-1);

        if (firstRecord.length && lastrecord.length && firstRecord[0].id !== lastrecord[0].id) {
            return Number((((lastrecord[0].amount - firstRecord[0].amount) / firstRecord[0].amount) * 100).toFixed(2));
        }

        return VALUE_MISSING;
    }

}

export default new CalculationService();

type TotalAmount = {
    totalIncomeAmount: string
    totalExpenceAmount: string
    savings: string
}

type AmountOfExpenses = {
    purchase: string
    amount: string
}[]
