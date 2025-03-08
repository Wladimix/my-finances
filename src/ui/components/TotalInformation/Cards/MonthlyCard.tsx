import { $monthlyTotalAmount } from '../../../storage/calculationStore';
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
    const totalAmount = useUnit($monthlyTotalAmount);

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

    const makeSavingsClass = () => {
        if (totalAmount.savings > 0) return 'uk-text-large uk-text-success';
        if (totalAmount.savings === 0) return 'uk-text-large';
        if (totalAmount.savings < 0) return 'uk-text-large uk-text-danger';
    };

    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>

            <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: 5%</div>

            <h2>{displayMonth()}</h2>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-left'>Доходы</div>
                <div className='uk-text-large'>{totalAmount.totalIncomeAmount ?? 0}</div>
            </div>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large'>Расходы</div>
                <div className='uk-text-large'>{totalAmount.totalExpensditureAmount ?? 0}</div>
            </div>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large'>Экономия</div>
                <div className={makeSavingsClass()}>{totalAmount.savings}</div>
            </div>

        </div>
    );
}
