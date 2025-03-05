import { useState } from 'react';
import { $allAccounts } from '../../../../storage/accountStore';
import { $allCategories } from '../../../../storage/categoryStore';
import { editSpendingCategory, editTransactionAddress } from '../../../../storage/transactionStore';
import { useUnit } from 'effector-react';

const NULL_CLASS = 'uk-text-muted';
const ACCOUNT_CLASS = 'uk-text-success';
const CATEGORY_CLASS = 'uk-text-danger';

export default function AddressTransactionSelect({ transaction }: IProps) {
    const determineDefaultAddressOrCategory = () => {

        if (transaction.transactionAddressId !== null && transaction.spendingCategoryId === null) {
            return 'account-' + transaction.transactionAddressId;
        }

        if (transaction.transactionAddressId === null && transaction.spendingCategoryId !== null) {
            return 'category-' + transaction.spendingCategoryId;
        }

        return '0';

    };

    const [addressOrCategory, setAddressOrCategory] = useState<string>(determineDefaultAddressOrCategory());

    const editTransactionAddressEvent = useUnit(editTransactionAddress);
    const editSpendingCategoryEvent = useUnit(editSpendingCategory);

    const allAccounts = useUnit($allAccounts);
    const allCategries = useUnit($allCategories);

    const makeSelectClass = () => {
        if (addressOrCategory === '0') {
            return 'custom-input uk-select uk-text-muted';
        } else {
            return 'custom-input uk-select';
        }
    };

    const handler = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setAddressOrCategory(e.target.value);

        switch(e.target.selectedOptions[0].className) {

            case NULL_CLASS:
                editTransactionAddressEvent({ id: transaction.id, transactionAddressId: null });
                editSpendingCategoryEvent({ id: transaction.id, spendingCategoryId: null });
                break;

            case ACCOUNT_CLASS:
                editTransactionAddressEvent({ id: transaction.id, transactionAddressId: Number(e.target.value.replace(/^\D+/g, "")) });
                break;

            case CATEGORY_CLASS:
                editSpendingCategoryEvent({ id: transaction.id, spendingCategoryId: Number(e.target.value.replace(/^\D+/g, "")) });
                break;

        }

    };

    const displayAccounts = () =>
        allAccounts.map(account =>
            <option
                className={ACCOUNT_CLASS}
                key={account.id}
                value={'account-' + account.id}
            >
                {account.name}
            </option>
        );

    const displayCategories = () =>
        allCategries.map(category =>
            <option
                className={CATEGORY_CLASS}
                key={category.id}
                value={'category-' + category.id}
            >
                {category.name}
            </option>
        );

    return(
        <select
            className={makeSelectClass()}
            onChange={handler}
            value={addressOrCategory}
        >
            <option className={NULL_CLASS} value={0}>не выбрано</option>
            {displayAccounts()}
            {displayCategories()}
        </select>
    );
}

interface IProps {
    transaction: ITransaction
}
