import AddressTransactionSelect from './Inputs/AddressTransactionSelect';
import AmountInput from './Inputs/AmountInput';
import DateInput from './Inputs/DateInput';
import DeleteTransactionButton from './Buttons/DeleteTransactionButton';
import OpenNoteButton from './Buttons/OpenNoteButton';
import SelectForDeletedEntities from './Inputs/SelectForDeletedEntities';
import SourceTransactionSelect from './Inputs/SourceTransactionSelect';

export default function Row({ transaction }: IProps) {
    const makeSourceTransactionClass = () => {
        if (transaction.sourceOfTransactionDeleted) {
            return 'select-cell not-hover';
        } else {
            return 'select-cell';
        }
    };

    const displaySourceTransactionSelect = () =>
        transaction.sourceOfTransactionDeleted
            ? <SelectForDeletedEntities transaction={transaction} />
            : <SourceTransactionSelect transaction={transaction} />;

    return(
        <tr>
            <td className='datepicker-cell'>
                <DateInput transaction={transaction} />
            </td>
            <td className={makeSourceTransactionClass()}>
                {displaySourceTransactionSelect()}
            </td>
            <td className='select-cell'>
                <AddressTransactionSelect />
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
