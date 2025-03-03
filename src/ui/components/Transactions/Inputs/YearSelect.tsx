import { $allYears } from '../../../storage/dateStore';
import { useUnit } from 'effector-react';

export default function YearSelect() {
    const allYears = useUnit($allYears);

    const displayYears = () =>
        allYears.map(year => <option key={year}>{year}</option>);

    return(
        <select className='uk-select'>
            <option>За всё время</option>
            {displayYears()}
        </select>
    );
}
