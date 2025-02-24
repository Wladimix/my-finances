import AddTransactionButton from './Buttons/AddTransactionButton';

export default function Heading() {
    return(
        <h1 className='uk-heading-divider'>
            <span>Транзакции</span>
            <AddTransactionButton />
        </h1>
    );
}
