import AddressTransactionSelect from './Inputs/AddressTransactionSelect';
import AmountInput from './Inputs/AmountInput';
import DateInput from './Inputs/DateInput';
import DeleteTransactionButton from './Buttons/DeleteTransactionButton';
import OpenNoteButton from './Buttons/OpenNoteButton';
import SourceTransactionSelect from './Inputs/SourceTransactionSelect';

export default function Row() {
    return(
        <tr>
            <td className='datepicker-cell'>
                <DateInput />
            </td>
            <td className='select-cell'>
                <SourceTransactionSelect />
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
                <DeleteTransactionButton />
            </td>
        </tr>
    );
}
