import { $allAccounts } from '../../../storage/accountStore';

import { convertAmount } from '../../../utils';
import { useUnit } from 'effector-react';

export default function TotalCard() {
    const allAccounts = useUnit($allAccounts);

    const calcSumAmount = () =>
        allAccounts.reduce((acc, curr) => acc + curr.amount, 0);

    return(
        <div className='uk-card uk-card-default uk-card-body uk-margin-bottom'>
            <div data-uk-grid>
                <h1 className='uk-width-expand uk-text-primary'>Всего в наличии</h1>
                <h1 className='uk-text-primary'>{convertAmount(calcSumAmount())}</h1>
            </div>
        </div>
    );
}
