import AddressTransactionSelect from './Inputs/AddressTransactionSelect';
import AmountInput from './Inputs/AmountInput';
import DateInput from './Inputs/DateInput';
import DeleteTransactionButton from './Buttons/DeleteTransactionButton';
import OpenNoteButton from './Buttons/OpenNoteButton';
import SelectForDeletedAddresses from './Inputs/SelectsForDeletedEntities/SelectForDeletedAddresses';
import SelectForDeletedSources from './Inputs/SelectsForDeletedEntities/SelectForDeletedSources';
import SourceTransactionSelect from './Inputs/SourceTransactionSelect';

export default function Row({ transaction }: IProps) {
    const makeSourceTransactionClass = () => {
        if (transaction.sourceOfTransactionDeleted) {
            return 'select-cell not-hover';
        } else {
            return 'select-cell';
        }
    };

    const makeAddressTransactionClass = () => {
        if (transaction.transactionAddressDeleted || transaction.spendingCategoryDeleted) {
            return 'select-cell not-hover';
        } else {
            return 'select-cell';
        }
    };

    const displaySourceTransactionSelect = () =>
        transaction.sourceOfTransactionDeleted
            ? <SelectForDeletedSources transaction={transaction} />
            : <SourceTransactionSelect transaction={transaction} />;

    const displayAddressTransactionSelectSelect = () =>
        transaction.transactionAddressDeleted || transaction.spendingCategoryDeleted
            ? <SelectForDeletedAddresses transaction={transaction} />
            : <AddressTransactionSelect transaction={transaction} />;

    return(
        <tr>
            <td className='datepicker-cell'>
                <DateInput transaction={transaction} />
            </td>
            <td className={makeSourceTransactionClass()}>
                {displaySourceTransactionSelect()}
            </td>
            <td className={makeAddressTransactionClass()}>
                {displayAddressTransactionSelectSelect()}
            </td>
            <td className='amount-cell'>
                <AmountInput />
            </td>
            <td>
                <OpenNoteButton />
            </td>
            <td className='uk-text-center'>
                <DeleteTransactionButton id={transaction.id} />
            </td>
        </tr>
    );
}

interface IProps {
    transaction: ITransaction
}
