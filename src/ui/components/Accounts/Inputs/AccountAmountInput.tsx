import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

import { $amount, changeAmount, editAccountAmount } from '../../../storage/accountStore';
import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';

export default function AccountAmountInput({ account }: IProps) {
    const editAccountAmountEvent = useUnit(editAccountAmount);
    const changeAmountEvent = useUnit(changeAmount);

    const amount = useUnit($amount);

    const [localAmount, changeLocalAmount] = useState<string | undefined>(String(account.amount));

    useEffect(() => {
        changeLocalAmount(String(account.amount));
    }, [account.amount]);

    const focusHandler = () => {
        if (localAmount && localAmount !== '0') {
            changeAmountEvent(Number(localAmount));
        }
    };

    const blurHandler = () => {

        if (!localAmount || localAmount === '0') {
            changeLocalAmount('0');
            editAccountAmountEvent({ id: account.id, amount: 0 });
        } else {
            changeLocalAmount(String(amount));
            editAccountAmountEvent({ id: account.id, amount });
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
            onFocus={focusHandler}
            onBlur={blurHandler}
            onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
            onValueChange={changeHandler}
            suffix=' ₽'
            value={localAmount}
        />
    );
}

interface IProps {
    account: IAccount
}
