import CalculationService from "../../services/CalculationService"

import { ChartEvent, LegendElement, LegendItem } from "chart.js"
import { DELETED_PARAMS_REGULAR } from "../../constants"
import { Doughnut } from "react-chartjs-2"
import { useAppSelector } from "../../storage/store"
import { useEffect, useState } from "react"

type ExpenditureStatisticsProps = {
    date: {
        selectedYear: string
        selectedMonth: string
    }
}

export default function ExpenditureStatistics({ date }: ExpenditureStatisticsProps) {
    const transactions = useAppSelector(state => state.data.transactions);

    const [amountOfExpenses, setAmountOfExpenses] = useState<AmountOfExpenses[]>([]);

    const makeTextClass = (purchase: string): string =>
        DELETED_PARAMS_REGULAR.test(purchase)
            ? "uk-width-expand uk-text-large uk-text-danger"
            : "uk-width-expand uk-text-large";

    useEffect(() => {
        CalculationService.getStatisticsOnExpenses(setAmountOfExpenses, { year: date.selectedYear, month: date.selectedMonth })
    }, [transactions]);

    const handleHover = (evt: ChartEvent, item: LegendItem, legend: LegendElement<"doughnut">): void => {
        const backgroundColor = legend.chart.data.datasets[0].backgroundColor as string[];
        backgroundColor.forEach((color, index, colors) => {
            colors[index] = index === item.index || color.length === 9 ? color : color + "4D";
        });
        legend.chart.update();
    }

    const handleLeave = (evt: ChartEvent, item: LegendItem, legend: LegendElement<"doughnut">): void => {
        const backgroundColor = legend.chart.data.datasets[0].backgroundColor as string[];
        backgroundColor.forEach((color, index, colors) => {
            colors[index] = color.length === 9 ? color.slice(0, -2) : color;
        });
        legend.chart.update();
    }

    const chart = <Doughnut
        data={{
            labels: amountOfExpenses.map(expenses => expenses.purchase),
            datasets: [{
                data: amountOfExpenses.map(expenses => Number(expenses.amount.replace(/[\s₽]+/g, ""))),
                backgroundColor: ["#CB4335", "#1F618D", "#F1C40F", "#27AE60", "#884EA0", "#D35400"]
            }]
        }}
        options={{
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    onHover: handleHover,
                    onLeave: handleLeave
                }
            }
        }}
    />;

    return (
        <>
            {amountOfExpenses.length ? chart : ""}
            <hr></hr>
            {
                amountOfExpenses.length
                    ?   amountOfExpenses.map(expenses => (
                            <div key={expenses.purchase} className="uk-grid-small" data-uk-grid>
                                <div className={makeTextClass(expenses.purchase)} data-uk-leader>
                                    {expenses.purchase.replace(DELETED_PARAMS_REGULAR, "")}
                                </div>
                                <div className="uk-text-large">{expenses.amount}</div>
                            </div>
                        ))
                    :   <div className="uk-alert-primary" data-uk-alert>
                            Недостаточно данных для расчёта статистики
                        </div>
            }
        </>
    );
}
