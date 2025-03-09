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
                    data: yearlyStatisticsOnExpenses.map(elem => elem.amount),
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
                        position: 'bottom',
                        onHover: (evt, item, legend): void => {
                            const backgroundColor = legend.chart.data.datasets[0].backgroundColor as string[];
                            backgroundColor.forEach((color, index, colors) => {
                                colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
                            });
                            legend.chart.update();
                        },
                        onLeave: (evt, item, legend): void => {
                            const backgroundColor = legend.chart.data.datasets[0].backgroundColor as string[];
                            backgroundColor.forEach((color, index, colors) => {
                                colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                            });
                            legend.chart.update();
                        }
                    }
                }
            }}
        /> : ''
    );
}
