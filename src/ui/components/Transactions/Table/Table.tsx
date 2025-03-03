import Header from './Header';
import NoTransactions from '../NoTransactions';
import Row from './Row';

import { $allTransactions } from '../../../storage/tranctionStore';
import { useUnit } from 'effector-react';

export default function Table() {
    const allTransactions = useUnit($allTransactions);

    const displayTransactions = () =>
        allTransactions.map(transaction =>
            <Row key={transaction.id} />
        );

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
