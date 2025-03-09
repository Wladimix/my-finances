import { $inflationData } from '../../../storage/inflationStore';
import { $selectedYear } from '../../../storage/dateStore';
import { $yearlyTotalAmount } from '../../../storage/calculationStore';
import { calcYearlyInflation, convertAmount } from '../../../utils';
import { useUnit } from 'effector-react';

export default function YearlyCard() {
    const inflation = useUnit($inflationData).inflation;
    const selectedYear = useUnit($selectedYear);
    const totalAmount = useUnit($yearlyTotalAmount);

    const makeSavingsClass = () => {
        if (totalAmount.savings > 0) return 'uk-text-large uk-text-success';
        if (totalAmount.savings === 0) return 'uk-text-large';
        if (totalAmount.savings < 0) return 'uk-text-large uk-text-danger';
    };

    const yearlyInflation = selectedYear ? calcYearlyInflation(inflation) : '';

    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>

            {selectedYear && yearlyInflation !== null && Object.keys(inflation).length !== 0 ? <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: {yearlyInflation}%</div> : ''}

            <h2>{selectedYear ?? 'год не выбран'}</h2>

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
