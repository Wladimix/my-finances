import { $note, $notesList, $transactionId } from '../../storage/noteStore';
import { editTransactionNote } from '../../storage/transactionStore';
import { useUnit } from 'effector-react';

export default function NotesButtons() {
    const editTransactionNoteEvent = useUnit(editTransactionNote);

    const transactionId = useUnit($transactionId);
    const notesList = useUnit($notesList);
    const currentNote = useUnit($note);

    const handler = (note: string | null) => {
        const noteValue = note !== '' ? note : null;
        editTransactionNoteEvent({ id: transactionId, note: noteValue });
    };

    const displayNewNoteButton = () => {
        return (
            <div
                className='uk-button uk-button-primary uk-margin-small-bottom uk-margin-small-right uk-modal-close'
                onClick={() => { handler(currentNote) }}
            >
                {currentNote}
            </div>
        );
    };

    const displayNotes = () =>
        notesList.map(note =>
            <div
                className='uk-button uk-button-secondary uk-margin-small-bottom uk-margin-small-right uk-modal-close'
                onClick={() => { handler(note.name) }}
            >
                {note.name}
            </div>
        );

    return(
        <div>
            {displayNewNoteButton()}
            {displayNotes()}
        </div>
    );
}
