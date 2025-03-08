import { $allYears } from '../../storage/dateStore';
import { Bar } from 'react-chartjs-2';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';

export default function TotalDiagram() {
    const allYears = useUnit($allYears);

    const [annualComparativeStatistic, setAnnualComparativeStatistic] = useState<ITotalAmount[]>([]);

    async function getAnnualComparativeStatistic() {

        const result: ITotalAmount[] = [];
        const defaultValue = {
            totalIncomeAmount: 0,
            totalExpensditureAmount: 0,
            savings: 0
        };

        for (let year of allYears.reverse()) {
            const totalAmountForYear = await window.electron.getTotalAmount({ year: String(year), month: null });
            result.push(totalAmountForYear.data ?? defaultValue);
        }

        setAnnualComparativeStatistic(result);

    }

    useEffect(() => {
        getAnnualComparativeStatistic();
    }, [allYears]);

    return(
        <Bar
            data={{
                labels: allYears,
                datasets: [
                    {
                        data: annualComparativeStatistic.map(elem => elem.totalIncomeAmount ?? 0),
                        label: 'Доходы',
                        backgroundColor: 'rgba(50, 200, 100, 0.5)'
                    },
                    {
                        data: annualComparativeStatistic.map(elem => elem.totalExpensditureAmount ?? 0),
                        label: 'Расходы',
                        backgroundColor: 'rgba(200, 50, 50, 0.5)'
                    }
                ]
            }}
            options={{
                animation: {
                    duration: 0
                }
            }}
        />
    );
}
