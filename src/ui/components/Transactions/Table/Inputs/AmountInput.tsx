import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

import { $amount, changeAmount, editTransactionAmount } from '../../../../storage/transactionStore';
import { TransactionTypes } from '../../../../constants';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function AmountInput({ transaction }: IProps) {
    const editTransactionAmountEvent = useUnit(editTransactionAmount);
    const changeAmountEvent = useUnit(changeAmount);

    const amount = useUnit($amount);

    const [localAmount, changeLocalAmount] = useState<string | undefined>(String(transaction.amount));

    const HTMLClasses = {
        [String(TransactionTypes.INCOME)]: 'custom-input uk-input uk-text-bold uk-text-success',
        [String(TransactionTypes.EXPENDITURE)]: 'custom-input uk-input uk-text-bold uk-text-danger',
        [String(TransactionTypes.TRANSLATION)]: 'custom-input uk-input uk-text-bold uk-text-warning',
        [String(TransactionTypes.PRICE_MONITORING)]: 'custom-input uk-input uk-text-bold',
        null: 'custom-input uk-input'
    };

    const focusHandler = () => {
        if (localAmount && localAmount !== '0') {
            changeAmountEvent(Number(localAmount));
        }
    };

    const blurHandler = () => {

        if (!localAmount || localAmount === '0' || Number(localAmount) < 0) {
            changeLocalAmount('0');
            editTransactionAmountEvent({ id: transaction.id, amount: 0 });
        } else {
            changeLocalAmount(String(amount));
            editTransactionAmountEvent({ id: transaction.id, amount });
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
            className={HTMLClasses[transaction.transactionType]}
            decimalSeparator='.'
            decimalsLimit={2}
            defaultValue={'0.00'}
            maxLength={10}
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
    transaction: ITransaction
}
