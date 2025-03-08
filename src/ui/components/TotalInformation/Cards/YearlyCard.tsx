import { $selectedYear } from '../../../storage/dateStore';
import { $yearlyTotalAmount } from '../../../storage/calculationStore';
import { useUnit } from 'effector-react';
import { convertAmount } from '../../../utils';

export default function YearlyCard() {
    const selectedYear = useUnit($selectedYear);
    const totalAmount = useUnit($yearlyTotalAmount);

    const makeSavingsClass = () => {
        if (totalAmount.savings > 0) return 'uk-text-large uk-text-success';
        if (totalAmount.savings === 0) return 'uk-text-large';
        if (totalAmount.savings < 0) return 'uk-text-large uk-text-danger';
    };

    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>

            <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: 5%</div>

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
