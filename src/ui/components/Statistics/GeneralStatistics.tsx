import CalculationService from "../../services/CalculationService"

import { convertAmountToNumber } from "../../../electron/lib/utils"
import { useAppSelector } from "../../storage/store"
import { useEffect, useState } from "react"

type GeneralStatisticsProps = {
    date: {
        selectedYear: string
        selectedMonth: string
    }
}

export default function GeneralStatistics({ date }: GeneralStatisticsProps) {
    const transactions = useAppSelector(state => state.data.transactions);
    const [totalStatistics, setTotalStatistics] = useState<TotalStatisticsDTO>({
        totalIncomeAmount: "",
        totalExpenceAmount: "",
        savings: ""
    });

    useEffect(() => {
        CalculationService.getTotalAmount(setTotalStatistics, { year: date.selectedYear, month: date.selectedMonth })
    }, [transactions]);

    const makeSavingsClass = (savingsValue: string): string => {
        if (savingsValue && convertAmountToNumber(savingsValue) > 0) {
            return "uk-text-large uk-text-success";
        } else if (savingsValue && convertAmountToNumber(savingsValue) < 0) {
            return "uk-text-large uk-text-danger";
        } else {
            return "uk-text-large";
        }
    }

    const savingsClass = makeSavingsClass(totalStatistics.savings);

    return (
        <table className="uk-table uk-table-small">
            <tbody>
                <tr>
                    <td className="uk-text-large uk-width-small">Доходы</td>
                    <td className="uk-text-large uk-text-right">{totalStatistics.totalIncomeAmount}</td>
                </tr>
                <tr>
                    <td className="uk-text-large uk-width-small">Расходы</td>
                    <td className="uk-text-large uk-text-right">{totalStatistics.totalExpenceAmount}</td>
                </tr>
                <tr>
                    <td className={savingsClass + " uk-width-small"}>Экономия</td>
                    <td className={savingsClass + " uk-text-right"}>{totalStatistics.savings}</td>
                </tr>
            </tbody>
        </table>
    );
}
