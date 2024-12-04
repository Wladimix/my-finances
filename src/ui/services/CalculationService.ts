import { NOT_DEFINE } from "../constants"
import { showNotification } from "../lib/utils"

class CalculationService {

    async getCapital(setCapital: React.Dispatch<React.SetStateAction<string>>) {
        const capital = await window.electron.getCapital();
        showNotification(capital, {onlyErrorChecking: true});

        if (capital.data) {
            setCapital(capital.data);
        } else {
            setCapital("?");
        }
    }

    async getTotalAmount(setTotalStatistics: React.Dispatch<React.SetStateAction<TotalStatisticsDTO>>, date: DateDTO) {
        const totalStatistics = await window.electron.getTotalAmount(date);
        showNotification(totalStatistics, {onlyErrorChecking: true});

        if (totalStatistics.data) {
            setTotalStatistics(totalStatistics.data);
        } else {
            setTotalStatistics({
                totalIncomeAmount: "",
                totalExpenceAmount: "",
                savings: ""
            });
        }
    }

    async getStatisticsOnExpenses(setAmountOfExpenses: React.Dispatch<React.SetStateAction<AmountOfExpenses[]>>, date: DateDTO) {
        const amountOfExpenses = await window.electron.getStatisticsOnExpenses(date);
        showNotification(amountOfExpenses, {onlyErrorChecking: true});

        if (amountOfExpenses.data) {
            setAmountOfExpenses(amountOfExpenses.data);
        } else {
            setAmountOfExpenses([]);
        }
    }

    async calculatePageCount(setPageCount: React.Dispatch<React.SetStateAction<number>>, filter: TransactionFilter): Promise<void> {
        const numberOfTransactions = await window.electron.getNumberOfTransactions(filter);
        showNotification(numberOfTransactions, { onlyErrorChecking: true });

        if (numberOfTransactions.data) {
            setPageCount(Math.ceil(numberOfTransactions.data / 30));
        } else {
            setPageCount(1);
        }
    }

    async getComparativeStatistics(setComparativeStatistics: React.Dispatch<React.SetStateAction<{ [key: keyof GetDatesDTO]: TotalStatisticsDTO }>>) {
        const dates = await window.electron.getAllTransactionDates();
        showNotification(dates, { onlyErrorChecking: true });

        const years = Object.keys(dates.data as GetDatesDTO);
        const comparativeStatistics: { [key: keyof GetDatesDTO]: TotalStatisticsDTO } = {};

        for (let year of years) {
            const totalAmount = await window.electron.getTotalAmount({ year, month: NOT_DEFINE });
            showNotification(totalAmount, { onlyErrorChecking: true });

            comparativeStatistics[year] = totalAmount.data as TotalStatisticsDTO;
        }

        setComparativeStatistics(comparativeStatistics);
    }

    async getInflationData(setInflation: React.Dispatch<React.SetStateAction<InflationDTO>>, year: number) {
        const inflation = await window.electron.getInflationData(year);
        showNotification(inflation, { onlyErrorChecking: true });

        if (inflation.data) {
            setInflation(inflation.data);
        } else {
            setInflation({ "товар": 0 })
        }
    }
}

export default new CalculationService();
