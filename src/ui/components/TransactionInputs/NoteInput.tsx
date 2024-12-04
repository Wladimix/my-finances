import NoteService from '../../services/NoteService'
import TransactionFormService from "../../services/Transaction/TransactionFormService"

import { setTransactionData } from "../../storage/transactionSlice"
import { useAppDispatch, useAppSelector } from "../../storage/store"
import { useState } from 'react'

export default function NoteInput() {
    const transactionData = useAppSelector(state => state.transaction.transactionData);
    const notes = useAppSelector(state => state.data.notes);

    const [timerId, setTimerId] = useState<NodeJS.Timeout>();

    const dispatch = useAppDispatch();
    const transactionFormService = new TransactionFormService(transactionData);
    const noteService = new NoteService(dispatch);

    const changeNoteEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTransactionData(
            {
                ...transactionData,
                note: e.target.value.toLowerCase().replace(/ +/g, ' '),
                toCalculateInflation: false
            }
        ));

        clearTimeout(timerId);
        setTimerId(setTimeout(() => {
            noteService.loadNotes(e.target.value.toLowerCase().trim().replace(/ +/g, ' '));
        }, 800));
    }

    const changeNoteButtonEvent = (note: string) => {
        dispatch(setTransactionData(
            { ...transactionData, note: note.toLowerCase().trim().replace(/ +/g, ' ') }
        ));

        noteService.loadNotes(note.toLowerCase().trim().replace(/ +/g, ' '));
    }

    return (
        <>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="note">Примечание</label>
                <div className="uk-form-controls">
                    <input
                        className="uk-input"
                        id="note"
                        onChange={changeNoteEvent}
                        spellCheck="false"
                        type="text"
                        value={transactionFormService.showNote()}
                    />
                </div>
            </div>

            <div>
                {
                    notes.map(note => (
                        <div
                            className="uk-button uk-button-secondary uk-margin-small-bottom uk-margin-small-right"
                            key={note.id}
                            onClick={() => { changeNoteButtonEvent(note.name) }}
                        >
                            {note.name}
                        </div>
                    ))
                }
            </div>

        </>
    );
}
