import { $monthlyStatisticsOnExpenses } from '../../../storage/calculationStore';
import { $selectedYear } from '../../../storage/dateStore';
import { Doughnut } from 'react-chartjs-2';
import { useUnit } from 'effector-react';

export default function MonthlyDiagram() {
    const monthlyStatisticsOnExpenses = useUnit($monthlyStatisticsOnExpenses);
    const selectedYear = useUnit($selectedYear);

    return(
        selectedYear && monthlyStatisticsOnExpenses.length ? <Doughnut
            data={{
                labels: selectedYear ? monthlyStatisticsOnExpenses.map(elem => elem.purchase.replace(/\(удалено.+\)/, '')) : [],
                datasets: [{
                    data: selectedYear ? monthlyStatisticsOnExpenses.map(elem => elem.amount) : [],
                    backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400']
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
