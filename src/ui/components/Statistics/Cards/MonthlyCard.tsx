import CategoryCosts from '../CategoryCosts';
import MonthlyDiagram from '../Diagrams/MonthlyDiagram';

import { $monthlyStatisticsOnExpenses } from '../../../storage/calculationStore';
import { $selectedMonth, $selectedYear } from '../../../storage/dateStore';
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

export default function MonthlyCard() {
    const selectedYear = useUnit($selectedYear);
    const selectedMonth = useUnit($selectedMonth);
    const monthlyStatisticsOnExpenses = useUnit($monthlyStatisticsOnExpenses);

    const displayMonth = () => {

        if (!selectedYear) {
            return 'год не выбран';
        }

        if (selectedYear && !selectedMonth) {
            return 'месяц не выбран';
        }

        if (selectedYear && selectedMonth) {
            return months[Number(selectedMonth)];
        }

    };

    const displayData = () => {
        if (selectedMonth) {
            return (
                <>
                    <MonthlyDiagram />
                    <CategoryCosts statisticsOnExpenses={monthlyStatisticsOnExpenses} />
                </>
            );
        } else {
            return '';
        }
    };

    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>
            <h2>{displayMonth()}</h2>
            {displayData()}
        </div>
    );
}
