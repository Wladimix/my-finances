import AddAccountButton from './Buttons/AddAccountButton';

export default function Heading() {
    return(
        <h1 className='uk-heading-divider'>
            <span>Счета</span>
            <AddAccountButton />
        </h1>
    );
}
