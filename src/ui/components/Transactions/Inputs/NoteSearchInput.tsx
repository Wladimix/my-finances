import { changeSearchInputValue } from '../../../storage/noteStore';
import { getAllTransations } from '../../../storage/transactionStore';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function NoteSearchInput() {
    const getAllTransationsEvent = useUnit(getAllTransations);
    const changeNoteEvent = useUnit(changeSearchInputValue);

    const [localNote, changeLocalNote] = useState<string | null>(null);

    const blurHandler = () => {
        changeNoteEvent(localNote);
        getAllTransationsEvent();
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeLocalNote(e.target.value !== '' ? e.target.value : null);
    };

    return(
        <input
            className='uk-input'
            onBlur={blurHandler}
            onChange={changeHandler}
            placeholder='поиск по примечанию'
            spellCheck={false}
            type='text'
            value={localNote ?? ''}
        />
    );
}
