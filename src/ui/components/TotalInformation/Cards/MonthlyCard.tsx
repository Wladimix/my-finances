import { $inflationData } from '../../../storage/inflationStore';
import { $monthlyTotalAmount } from '../../../storage/calculationStore';
import { $selectedMonth, $selectedYear } from '../../../storage/dateStore';
import { calcMonthlyInflation, convertAmount } from '../../../utils';
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
    const inflation = useUnit($inflationData).inflation;
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

    const monthlyInflation = selectedMonth ? calcMonthlyInflation(inflation[String(Number(selectedMonth) + 1)]) : '';

    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>

            {selectedMonth && monthlyInflation !== null ? <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: {monthlyInflation}%</div> : ''}

            <h2>{displayMonth()}</h2>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-left'>Доходы</div>
                <div className='uk-text-large'>{convertAmount(totalAmount.totalIncomeAmount ?? 0)}</div>
            </div>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large'>Расходы</div>
                <div className='uk-text-large'>{convertAmount(totalAmount.totalExpensditureAmount ?? 0)}</div>
            </div>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large'>Экономия</div>
                <div className={makeSavingsClass()}>{convertAmount(totalAmount.savings)}</div>
            </div>

        </div>
    );
}
