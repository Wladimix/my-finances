import { $inflationData } from '../../../storage/inflationStore';
import { $note } from '../../../storage/noteStore';
import { Bar } from 'react-chartjs-2';
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

export default function InflationDiagram() {
    const inflationData = useUnit($inflationData);
    const note = useUnit($note);

    const makeMonthList = () => {

        const monthList: { [key: string]: number } = {};

        for (let elem in inflationData.inflation) {
            if (note) {

                const monthData = inflationData.inflation[elem];

                if (monthData[note]) {
                    monthList[months[Number(elem) - 1]] = monthData[note];
                }

            }
        }

        return monthList;

    };

    const diagramData = makeMonthList();

    return(
        Object.keys(diagramData).length ? <Bar
            data={{
                labels: Object.keys(diagramData),
                datasets: [
                    {
                        data: Object.values(diagramData),
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
