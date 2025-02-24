import { Bar } from 'react-chartjs-2';

export default function InflationDiagram() {
    return(
        <Bar
            data={{
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',],
                datasets: [
                    {
                        data: [1, 2, 2, 2, 4, 4, 3, 4, 4, 5, 5, 6],
                    }
                ]
            }}
            options={{
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                animation: {
                    duration: 0
                }
            }}
        />
    );
}
