import { Bar } from 'react-chartjs-2';

export default function TotalDiagram() {
    return(
        <Bar
            data={{
                labels: [2022, 2023, 2024, 2022, 2023, 2024, 2022, 2023, 2024, 2022, 2023, 2024],
                datasets: [
                    {
                        data: [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300],
                        label: 'Доходы',
                        backgroundColor: 'rgba(50, 200, 100, 0.5)'
                    },
                    {
                        data: [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300],
                        label: 'Расходы',
                        backgroundColor: 'rgba(200, 50, 50, 0.5)'
                    },
                    {
                        data: [100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300, 100, 200, 300],
                        label: 'Экономия',
                        backgroundColor: 'rgba(190, 200, 50, 0.5)'
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
