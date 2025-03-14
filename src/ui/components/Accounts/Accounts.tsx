import AccountCard from './AccountCard';
import Heading from './Heading';
import NoAccaunts from './NoAccaunts';

import { $allAccounts } from '../../storage/accountStore';
import { useUnit } from 'effector-react';

export default function Accounts() {
    const allAccounts = useUnit($allAccounts);

    const displayAccounts = () => {
        return allAccounts.map(account =>
            <div key={account.id}>
                <AccountCard account={account} />
            </div>);
    };

    return(
        <>
            <Heading />
            {
                allAccounts.length
                    ? <div className='uk-grid-column-small uk-grid-row-small uk-child-width-1-3@s' data-uk-grid>
                        { displayAccounts() }
                    </div>
                    : <NoAccaunts />
            }
        </>
    );
}
