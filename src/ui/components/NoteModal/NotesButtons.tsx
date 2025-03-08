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
        if (currentNote !== null) {
            return (
                <div
                    className='uk-button uk-button-primary uk-margin-small-bottom uk-margin-small-right uk-modal-close'
                    onClick={() => { handler(currentNote) }}
                >
                    <span className='uk-margin-remove' data-uk-icon='icon: plus-circle; ratio: 1.3'></span>
                </div>
            );
        } else {
            return '';
        }
    };

    const displayNotes = () =>
        notesList.map(note =>
            <div
                className='uk-button uk-button-secondary uk-margin-small-bottom uk-margin-small-right uk-modal-close'
                key={note.id}
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
