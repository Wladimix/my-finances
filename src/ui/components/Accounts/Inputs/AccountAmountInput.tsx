import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

import { $amount, changeAmount, editAccountAmount } from '../../../storage/accountStore';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function AccountAmountInput({ account }: IProps) {
    const changeAmountEvent = useUnit(changeAmount);

    const amount = useUnit($amount);

    const [localAmount, changeLocalAmount] = useState<string | undefined>(String(account.amount));

    const blurHandler = () => {

        if (!localAmount || localAmount === '0') {
            changeLocalAmount('0');
            editAccountAmount({ id: account.id, amount: 0 });
        } else {
            editAccountAmount({ id: account.id, amount });
        }

    };

    const changeHandler = (
        value: string | undefined,
        name: string | undefined,
        values: CurrencyInputOnChangeValues | undefined
    ) => {

        changeLocalAmount(value);

        if (values && values.float) {
            changeAmountEvent(values.float);
        }

    };

    return(
        <CurrencyInput
            className='custom-input uk-input uk-text-large'
            decimalSeparator='.'
            decimalsLimit={2}
            defaultValue={'0.00'}
            maxLength={15}
            onBlur={blurHandler}
            onValueChange={changeHandler}
            suffix=' ₽'
            value={localAmount}
        />
    );
}

interface IProps {
    account: IAccount
}
