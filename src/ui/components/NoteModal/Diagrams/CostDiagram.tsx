import { Line } from 'react-chartjs-2';

export default function CostDiagram() {
    return(
        <Line
            data={{
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',],
                datasets: [
                    {
                        data: [100, 200, 200, 200, 400, 400, 300, 400, 400, 500, 500, 600],
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
