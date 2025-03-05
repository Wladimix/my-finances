import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

import { $amount, changeAmount, editTransactionAmount } from '../../../../storage/transactionStore';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function AmountInput({ transaction }: IProps) {
    const changeAmountEvent = useUnit(changeAmount);

    const amount = useUnit($amount);

    const [localAmount, changeLocalAmount] = useState<string | undefined>(String(transaction.amount));

    const blurHandler = () => {

        if (!localAmount || localAmount === '0') {
            changeLocalAmount('0');
            editTransactionAmount({ id: transaction.id, amount: 0 });
        } else {
            editTransactionAmount({ id: transaction.id, amount });
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
            className='custom-input uk-input'
            decimalSeparator='.'
            decimalsLimit={2}
            defaultValue={'0.00'}
            maxLength={10}
            onBlur={blurHandler}
            onValueChange={changeHandler}
            suffix=' ₽'
            value={localAmount}
        />
    );
}

interface IProps {
    transaction: ITransaction
}
