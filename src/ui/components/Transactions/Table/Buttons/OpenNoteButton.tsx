import NoteModal from '../../../NoteModal/NoteModal';

import { changeCalculateInflationFlag, changeCalculateStatisticFlag, changeNote, changeNotesList, changeTransactionId } from '../../../../storage/noteStore';
import { useUnit } from 'effector-react';

export default function OpenNoteButton({ transaction }: IProps) {
    const changeTransactionIdEvent = useUnit(changeTransactionId);
    const changeNoteEvent = useUnit(changeNote);
    const changeCalculateStatisticFlagEvent = useUnit(changeCalculateStatisticFlag);
    const changeCalculateInflationFlagEvent = useUnit(changeCalculateInflationFlag);
    const changeNotesListEvent = useUnit(changeNotesList);

    const makeClass = () => {

        if (transaction.note && transaction.toCalculateInflation) {
            return 'note uk-text-primary';
        }

        if (transaction.note && !transaction.toCalculateInflation) {
            return 'note uk-text';
        }

        return 'note';

    };

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
