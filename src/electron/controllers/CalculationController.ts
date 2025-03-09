import { getInflationData } from '../services/inflationService';
import { getStatisticsOnExpenses, getTotalAmount } from '../services/statisticService';
import { makeError } from '../utils';

export default class CalculationController {

    static async getTotalAmount({ year, month }: { year: string, month: string | null }): Promise<ResponceData<ITotalAmount>> {
        try {

            const totalAmount = await getTotalAmount(year, month);

            return {
                data: totalAmount,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения общей статистики');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async getStatisticsOnExpenses({ year, month }: { year: string, month: string | null }): Promise<ResponceData<IStatisticsOfExpenses[]>> {
        try {

            const statisticsOnExpenses = await getStatisticsOnExpenses(year, month);

            return {
                data: statisticsOnExpenses,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения статистики по категориям');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async getInflation(year: string): Promise<ResponceData<IInflationData>> {
        try {

            const inflationData = await getInflationData(year);

            return {
                data: inflationData,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения инфляции');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

}
