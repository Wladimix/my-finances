import NoteModal from '../../../NoteModal/NoteModal';

import { changeCalculateInflationFlag, changeCalculateStatisticFlag, changeNote, changeNotesList, changeTransactionId } from '../../../../storage/noteStore';
import { useUnit } from 'effector-react';

export default function OpenNoteButton({ transaction }: IProps) {
    const changeTransactionIdEvent = useUnit(changeTransactionId);
    const changeNoteEvent = useUnit(changeNote);
    const changeCalculateStatisticFlagEvent = useUnit(changeCalculateStatisticFlag);
    const changeCalculateInflationFlagEvent = useUnit(changeCalculateInflationFlag);
    const changeNotesListEvent = useUnit(changeNotesList);

    const makeClass = () =>
        transaction.note
            ? 'note'
            : 'note uk-text-muted';

    const handler = () => {
        changeTransactionIdEvent(transaction.id);
        changeNoteEvent(transaction.note);
        changeCalculateStatisticFlagEvent(transaction.toCalculateStatistic);
        changeCalculateInflationFlagEvent(transaction.toCalculateInflation);
        changeNotesListEvent('');
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
