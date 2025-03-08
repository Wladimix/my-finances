import { getTotalAmount } from '../services/statisticService';
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

}
