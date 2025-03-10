import { $yearlyStatisticsOnExpenses } from '../../../storage/calculationStore';
import { Doughnut } from 'react-chartjs-2';
import { useUnit } from 'effector-react';

export default function YearlyDiagram() {
    const yearlyStatisticsOnExpenses = useUnit($yearlyStatisticsOnExpenses);

    return(
        yearlyStatisticsOnExpenses.length ? <Doughnut
            data={{
                labels: yearlyStatisticsOnExpenses.map(elem => elem.purchase.replace(/\(удалено.+\)/, '')),
                datasets: [{
                    data: yearlyStatisticsOnExpenses.map(elem => elem.amount)
                }]
            }}
            options={{
                animation: {
                    duration: 0
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }}
        /> : ''
    );
}
