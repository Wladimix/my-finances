import { useState } from 'react';
import { $note, changeNote, changeNotesList } from '../../storage/noteStore';
import { useUnit } from 'effector-react';

export default function NoteInput() {
    const changeNoteEvent = useUnit(changeNote);
    const changeNotesListEvent = useUnit(changeNotesList);

    const note = useUnit($note);

    const [timerId, setTimerId] = useState<any>();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const noteValue = e.target.value !== '' ? e.target.value.toLowerCase() : null;
        changeNoteEvent(noteValue);

        clearTimeout(timerId);
        setTimerId(setTimeout(() => {
            changeNotesListEvent(noteValue ?? '');
        }, 800));

    };

    const blurHandler = () => {
        clearTimeout(timerId);
        changeNotesListEvent('');
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
