import { deleteTransaction } from '../../../../storage/transactionStore';
import { useUnit } from 'effector-react';

export default function DeleteTransactionButton({ id }: IProps) {
    const deleteTransactionEvent = useUnit(deleteTransaction);

    const handler = () => {
        deleteTransactionEvent(id);
    };

    return(
        <div className='actions'>
            <button
                className='uk-icon-link'
                data-uk-icon='icon: trash; ratio: 1.2'
                onClick={handler}
            />
        </div>
    );
}

interface IProps {
    id: number
}
