import { Doughnut } from 'react-chartjs-2';

export default function MonthlyDiagram() {
    return(
        <Doughnut
            data={{
                labels: ['test1', 'test2'],
                datasets: [{
                    data: [200, 400],
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
        />
    );
}
