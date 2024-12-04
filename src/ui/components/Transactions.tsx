import Pagination from "./Pagination"
import TransactionService from "../services/Transaction/TransactionService"
import TransactionsTable from "./Tables/TransactionsTable"

import { setEventType, setRequiredNote, setTransactionData } from "../storage/transactionSlice"
import { setNotes } from "../storage/dataSlice"
import { setPage } from "../storage/paginationSlice"
import { TransactionEvent } from "../constants"
import { useAppDispatch, useAppSelector } from "../storage/store"
import { useState } from "react"

export default function Transactions() {
    const transaction = useAppSelector(state => state.transaction);
    const date = useAppSelector(state => state.date);

    const [timerId, setTimerId] = useState<NodeJS.Timeout>();

    const dispatch = useAppDispatch();

    const openModalEvent = (): void => {
        dispatch(setEventType(TransactionEvent.ADD));
        dispatch(setNotes([]));
        dispatch(setTransactionData({ ...transaction.transactionData, date: new Date() }));
    }

    const changeNoteEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRequiredNote(e.target.value.toLowerCase().replace(/ +/g, ' ')));
        dispatch(setPage(0));

        clearTimeout(timerId);
        setTimerId(setTimeout(() => {

            new TransactionService(dispatch).loadTransactions({
                year: date.selectedYear,
                month: date.selectedMonth,
                note: e.target.value.toLowerCase().trim().replace(/ +/g, ' '),
                page: 0
            });

        }, 1000));
    }

    return (
        <>
            <div className="uk-grid">
                <h1>Транзакции</h1>

                <button
                    className="uk-icon-link uk-padding-remove uk-margin-small-left"
                    uk-icon="icon: plus-circle; ratio: 2.5"
                    uk-toggle="target: #transaction"
                    onClick={openModalEvent}
                />

                <div className="uk-width-expand uk-text-right">
                    <div className="uk-inline uk-width-1-2">
                        <span className="uk-form-icon" data-uk-icon="icon: search; ratio: 1.2" />
                        <input
                            aria-label="Not clickable icon"
                            className="uk-input"
                            onChange={changeNoteEvent}
                            placeholder="примечание"
                            spellCheck="false"
                            type="text"
                            value={transaction.requiredNote}
                        />
                    </div>
                </div>
                <div><a className="uk-button uk-button-primary" href="#statistics" data-uk-scroll>СТАТИСТИКА</a></div>
            </div>

            <TransactionsTable />
            <Pagination />
        </>
    );
}
