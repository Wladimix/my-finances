import CurrencyInput from 'react-currency-input-field';

export default function AccountAmountInput({ account }: IProps) {
    return(
        <CurrencyInput
            className='custom-input uk-input uk-text-large'
            decimalSeparator='.'
            decimalsLimit={2}
            defaultValue={'0.00'}
            maxLength={15}
            onValueChange={(value, name, values) => console.log(value, name, values)}
            suffix=' ₽'
            value={account.amount}
        />
    );
}

interface IProps {
    account: IAccount
}
