import CurrencyInput from 'react-currency-input-field';

export default function AmountInput() {
    return(
        <CurrencyInput
            className='custom-input uk-input'
            decimalSeparator='.'
            decimalsLimit={2}
            defaultValue={'0.00'}
            maxLength={12}
            onValueChange={(value, name, values) => console.log(value, name, values)}
            suffix=' ₽'
        />
    );
}
