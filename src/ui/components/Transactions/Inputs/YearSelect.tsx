import { $allYears, $selectedYear, changeYear } from '../../../storage/dateStore';
import { unselectedElements } from '../../../constants';
import { useUnit } from 'effector-react';

export default function YearSelect() {
    const changeYearEvent = useUnit(changeYear);

    const allYears = useUnit($allYears);
    const selectedYear = useUnit($selectedYear);

    // TODO: удалить
    console.log(selectedYear);

    const displayYears = () =>
        allYears.map(year =>
            <option key={year}>
                {year}
            </option>
        );

    const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value !== unselectedElements.YEAR_IS_NOT_SELECTED ? e.target.value : null;
        changeYearEvent(year);
    };

    const makeSelectValue = () => selectedYear ?? unselectedElements.YEAR_IS_NOT_SELECTED;

    return(
        <select
            className='uk-select'
            onChange={handler}
            value={makeSelectValue()}
        >
            <option>{unselectedElements.YEAR_IS_NOT_SELECTED}</option>
            {displayYears()}
        </select>
    );
}
