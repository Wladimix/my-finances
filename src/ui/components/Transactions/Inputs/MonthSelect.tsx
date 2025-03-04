import { $selectedMonth, changeMonth } from '../../../storage/dateStore';
import { unselectedElements } from '../../../constants';
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

export default function MonthSelect() {
    const changeMonthEvent = useUnit(changeMonth);

    const selectedMonth = useUnit($selectedMonth);

    const displayMonths = () =>
        months.map((month, index) =>
            <option key={index} value={index}>
                {month}
            </option>
        );

    const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value !== unselectedElements.MONTH_IS_NOT_SELECTED ? e.target.value : null;
        changeMonthEvent(month);
    };

    const makeSelectValue = () => selectedMonth ?? unselectedElements.MONTH_IS_NOT_SELECTED;

    return(
        <select
            className='uk-select'
            onChange={handler}
            value={makeSelectValue()}
        >
            <option>{unselectedElements.MONTH_IS_NOT_SELECTED}</option>
            {displayMonths()}
        </select>
    );
}
