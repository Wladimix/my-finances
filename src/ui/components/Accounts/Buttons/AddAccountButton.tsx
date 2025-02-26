import { $allAccounts, addAccount } from '../../../storage/accountStore';
import { useUnit } from 'effector-react';

export default function AddAccountButton() {
    const allAccounts = useUnit($allAccounts);

    const accountAvailability = Boolean(allAccounts.find(account => account.name === 'Новый счёт'));

    const handler = () => {
        if (!accountAvailability) {
            addAccount();
        }
    };

    return(
        <>
            {
                !accountAvailability &&
                <button
                    className='uk-icon-link uk-margin-small-left'
                    data-uk-icon='icon:  plus-circle; ratio: 2'
                    onClick={handler}
                />
            }
        </>
    );
}
