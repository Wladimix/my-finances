import { $inflationData } from '../../../storage/inflationStore';
import { $note } from '../../../storage/noteStore';
import { Line } from 'react-chartjs-2';
import { useUnit } from 'effector-react';

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export default function CostDiagram() {
    const averageCostData = useUnit($inflationData).averageCost;
    const note = useUnit($note);

    const makeMonthList = () => {

        const monthList: { [key: string]: number } = {};

        for (let elem in averageCostData) {
            if (note) {

                const monthData = averageCostData[elem];

                if (monthData[note]) {
                    monthList[months[Number(elem) - 1]] = monthData[note];
                }

            }
        }

        return monthList;

    };

    const lineData = makeMonthList();

    return(
        Object.keys(lineData).length ? <Line
            data={{
                labels: Object.keys(lineData),
                datasets: [
                    {
                        data: Object.values(lineData),
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
                    }
                ]
            }}
            options={{
                plugins: {
                    legend: {
                        display: false
                    }
                },
                animation: {
                    duration: 0
                }
            }}
        /> : <div className='uk-alert-primary' data-uk-alert>
            <h3>данные отсутствуют</h3>
        </div>
    );
}
