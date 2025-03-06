import { $note, $transactionId, changeNote } from '../../storage/noteStore';
import { editTransactionNote } from '../../storage/transactionStore';
import { useUnit } from 'effector-react';

export default function NoteInput() {
    const editTransactionNoteEvent = useUnit(editTransactionNote);
    const changeNoteEvent = useUnit(changeNote);

    const transactionId = useUnit($transactionId);
    const note = useUnit($note);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const noteValue = e.target.value !== '' ? e.target.value.toLowerCase() : null;
        changeNoteEvent(noteValue);
    };

    const blurHandler = () => {
        const noteValue = note !== '' ? note : null;
        editTransactionNoteEvent({ id: transactionId, note: noteValue });
    };

    return(
        <input
            className='custom-input uk-input'
            onChange={changeHandler}
            onBlur={blurHandler}
            placeholder='примечание отсутствует'
            spellCheck={false}
            value={note ?? ''}
        />
    );
}
