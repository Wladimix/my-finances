import CategoryCosts from '../CategoryCosts';
import YearlyDiagram from '../Diagrams/YearlyDiagram';

import { $selectedYear } from '../../../storage/dateStore';
import { $yearlyStatisticsOnExpenses } from '../../../storage/calculationStore';
import { useUnit } from 'effector-react';

export default function YearlyCard() {
    const selectedYear = useUnit($selectedYear);
    const yearlyStatisticsOnExpenses = useUnit($yearlyStatisticsOnExpenses);

    const displayData = () => {
        if (selectedYear) {
            return (
                <>
                    <YearlyDiagram />
                    <CategoryCosts statisticsOnExpenses={yearlyStatisticsOnExpenses} />
                </>
            );
        } else {
            return '';
        }
    };

    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>
            <h2>{selectedYear ?? 'год не выбран'}</h2>
            {displayData()}
        </div>
    );
}
