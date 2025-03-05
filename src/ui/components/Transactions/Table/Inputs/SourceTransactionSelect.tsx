import { $allAccounts } from '../../../../storage/accountStore';
import { editSourceOfTransaction } from '../../../../storage/transactionStore';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function SourceTransactionSelect({ transaction }: IProps) {
    const [sourceOfTransactionId, setSourceOfTransactionId] = useState<number>(transaction.sourceOfTransactionId);

    const editSourceTransactionEvent = useUnit(editSourceOfTransaction);

    const allAccounts = useUnit($allAccounts);

    const makeSelectClass = () => {
        if (!sourceOfTransactionId) {
            return 'custom-input uk-select uk-text-muted';
        } else {
            return 'custom-input uk-select';
        }
    };

    const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSourceOfTransactionId(Number(e.target.value));
        const sourceOfTransactionId = e.target.value !== '0' ? Number(e.target.value) : null;
        editSourceTransactionEvent({ id: transaction.id, sourceOfTransactionId });
    };

    const displayAccounts = () =>
        allAccounts.map(account =>
            <option
                key={account.id}
                value={account.id}
            >
                {account.name}
            </option>
        );

    return(
        <select
            className={makeSelectClass()}
            onChange={handler}
            value={sourceOfTransactionId}
        >
            <option className='uk-text-muted' value={0}>не выбрано</option>
            {displayAccounts()}
        </select>
    );
}

interface IProps {
    transaction: ITransaction
}
