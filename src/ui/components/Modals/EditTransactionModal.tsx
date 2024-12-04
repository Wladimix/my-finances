import AddressOrCategoryInput from "../TransactionInputs/AddressOrCategoryInput"
import AmountInput from "../TransactionInputs/AmountInput"
import DateInput from "../TransactionInputs/DateInput"
import InflationCheckBox from "../TransactionInputs/InflationCheckBox"
import NoteInput from "../TransactionInputs/NoteInput"
import SourceOfTransactionInput from "../TransactionInputs/SourceOfTransactionInput"
import TransactionService from "../../services/Transaction/TransactionService"

import { NOT_DEFINE, TransactionEvent, TransactionsTypes } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../storage/store"

type TransactionModalParams = {
    [key in TransactionEvent]: string
}

export default function EditTransactionModal() {
    const date = useAppSelector(state => state.date);
    const transaction = useAppSelector(state => state.transaction);
    const currentPage = useAppSelector(state => state.pagination);

    const windowHeaders: TransactionModalParams = {
        [TransactionEvent.ADD]: "Новая транзакция",
        [TransactionEvent.EDIT]: "Редактирование транзакции"
    }

    const dispatch = useAppDispatch();
    const transactionService = new TransactionService(dispatch);

    const transactionEvents = {

        [TransactionEvent.ADD]: (): void => {transactionService.addTransaction(
            transaction.transactionData,
            {
                year: date.selectedYear,
                month: date.selectedMonth,
                note: transaction.requiredNote,
                page: currentPage
            }
        )},

        [TransactionEvent.EDIT]: (): void => {transactionService.editTransaction(
            transaction.id,
            transaction.transactionData,
            {
                year: date.selectedYear,
                month: date.selectedMonth,
                note: transaction.requiredNote,
                page: currentPage
            }
        )}

    }

    const buttonValues: TransactionModalParams = {
        [TransactionEvent.ADD]: "ДОБАВИТЬ",
        [TransactionEvent.EDIT]: "РЕДАКТИРОВАТЬ"
    }

    const textClasses = {
        [String(TransactionsTypes.FINANCIAL_INCOME)]: "uk-text-center uk-text-large uk-text-success",
        [String(TransactionsTypes.FINANCIAL_TRANSFER)]: "uk-text-center uk-text-large uk-text-warning",
        [String(TransactionsTypes.FINANCIAL_EXPENCE)]: "uk-text-center uk-text-large uk-text-danger",
        [String(TransactionsTypes.PRICE_MONITORING)]: "uk-text-center uk-text-large",
        [NOT_DEFINE]: "uk-text-center uk-text-large",
    }

    return (
        <div id="transaction" data-uk-modal data-container="false">
            <div className="uk-modal-dialog">

                <button className="uk-modal-close-default" type="button" data-uk-close></button>

                <div className="uk-modal-header">
                    <h2 className="uk-modal-title">
                        {windowHeaders[transaction.eventType]}
                    </h2>
                </div>

                <div className="uk-modal-body">
                    <DateInput />
                    <SourceOfTransactionInput />
                    <AddressOrCategoryInput />
                    <NoteInput />
                    <InflationCheckBox />
                    <AmountInput />

                    <div className={textClasses[transaction.transactionData.transactionType]}>
                        <p>{transaction.transactionData.transactionType}</p>
                    </div>
                </div>

                <div className="uk-modal-footer uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close">
                        ЗАКРЫТЬ
                    </button>
                    <button
                        className="uk-button uk-button-primary uk-modal-close"
                        disabled={!transactionService.checkTransaction(transaction.transactionData)}
                        onClick={transactionEvents[transaction.eventType]}
                    >
                        {buttonValues[transaction.eventType]}
                    </button>
                </div>

            </div>
        </div>
    );
}
