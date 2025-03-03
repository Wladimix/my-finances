import Header from './Header';
import NoTransactions from '../NoTransactions';
import Row from './Row';

import { $allTransactions } from '../../../storage/transactionStore';
import { useUnit } from 'effector-react';

export default function Table() {
    const allTransactions = useUnit($allTransactions);

    const displayTransactions = () =>
        allTransactions.map(transaction =>
            <Row key={transaction.id} transaction={transaction} />
        );

    // TODO: удалить
    console.log(allTransactions);

    return(
        <table>
            <thead>
                <Header />
            </thead>
            <tbody>
                <>
                    {
                        allTransactions.length
                            ? displayTransactions()
                            : <NoTransactions />
                    }
                </>
            </tbody>
        </table>
    );
}
