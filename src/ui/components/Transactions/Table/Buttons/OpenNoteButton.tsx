import NoteModal from '../../../NoteModal/NoteModal';

import { changeNote, changeTransactionId } from '../../../../storage/noteStore';
import { useUnit } from 'effector-react';

export default function OpenNoteButton({ transaction }: IProps) {
    const changeTransactionIdEvent = useUnit(changeTransactionId);
    const changeNoteEvent = useUnit(changeNote);

    const makeClass = () =>
        transaction.note
            ? 'note'
            : 'note uk-text-muted';

    const handler = () => {
        changeTransactionIdEvent(transaction.id);
        changeNoteEvent(transaction.note);
    };

    return(
        <>
            <div
                className={makeClass()}
                data-uk-toggle='target: #note-modal'
                onClick={handler}
            >
                {transaction.note ?? 'нет'}
            </div>

            <NoteModal />
        </>
    );
}

interface IProps {
    transaction: ITransaction
}
