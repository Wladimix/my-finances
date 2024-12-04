import TransactionRowService from '../../services/Transaction/TransactionRowService'
import TransactionService from '../../services/Transaction/TransactionService'

import { setEventType, setTransactionData, setTransactionId } from '../../storage/transactionSlice'
import { NOT_DEFINE, TransactionEvent } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../storage/store'
import { setNotes } from '../../storage/dataSlice'

type TransactionsTableRowProps = {
    transaction: GetTransactionDTO
}

export default function TransactionsTableRow({ transaction }: TransactionsTableRowProps) {
    const date = useAppSelector(state => state.date);
    const requiredNote = useAppSelector(state => state.transaction.requiredNote);
    const currentPage = useAppSelector(state => state.pagination);
    const inflation = useAppSelector(state => state.inflation);

    const transactionRowService = new TransactionRowService(transaction);
    const transactionParams = transactionRowService.makeTransactionParamsToShow();

    const data = transactionParams.data;
    const classes = transactionParams.classes;

    const dispatch = useAppDispatch();

    const openModalEvent = (): void => {
        dispatch(setEventType(TransactionEvent.EDIT));
        dispatch(setNotes([]));
        dispatch(setTransactionId(transaction.id));
        dispatch(setTransactionData({
            date: transaction.date,
            sourceOfTransactionId: transaction.sourceOfTransactionId,
            transactionAddressId: transaction.transactionAddressId,
            spendingCategoryId: transaction.spendingCategoryId,
            note: transaction.note,
            amount: transaction.amount,
            toCalculateInflation: transaction.toCalculateInflation
        }));
    }

    const transactionService = new TransactionService(dispatch);
    const deleteTransactionEvent = (): void => {transactionService.deleteTransaction(
        transaction,
        {
            year: date.selectedYear,
            month: date.selectedMonth,
            note: requiredNote,
            page: currentPage
        }
    )}

    return (
        <>
            <tr>
                <td>{data.date}</td>
                <td className={classes.sourceOfTransaction}>{data.sourceOfTransaction}</td>
                <td className={classes.addressOrCategory}>{data.addressOrCategory}</td>
                <td>
                    {
                        date.selectedYear !== NOT_DEFINE
                            ?   <div className={inflation[data.note] ? "uk-text-primary uk-text-bold" : ""} data-uk-tooltip={`title: ${inflation[data.note] ? "Инфляция за год: " + inflation[data.note] + "%" : ""}; pos: top; delay: 200`}>{data.note}</div>
                            :   <div>{data.note}</div>
                    }
                </td>
                <td className={classes.amount}>{data.amount}</td>
                <td className="uk-text-center">
                    <button
                        className="uk-icon-link"
                        data-uk-icon="icon: pencil; ratio: 1.5"
                        data-uk-toggle="target: #transaction"
                        hidden={transactionParams.thereDeletedParameters}
                        onClick={openModalEvent}
                    />
                    <button
                        className="uk-icon-link"
                        data-uk-icon="icon: trash; ratio: 1.5"
                        hidden={transactionParams.thereDeletedParameters}
                        onClick={deleteTransactionEvent}
                    />
                </td>
            </tr>
        </>
    );
}
