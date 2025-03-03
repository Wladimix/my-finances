import { addTransaction } from '../../../storage/transactionStore';
import { useUnit } from 'effector-react';

export default function AddTransactionButton() {
    const addTransactionEvent = useUnit(addTransaction);

    const handler = () => {
        addTransactionEvent(new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            0, 0, 0
        ));
    };

    return(
        <button
            className='uk-icon-link uk-margin-small-left'
            data-uk-icon='icon: plus-circle; ratio: 2'
            onClick={handler}
        />
    );
}
