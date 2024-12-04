import GeneralStatistics from "../Statistics/GeneralStatistics"
import monthsDictionary from "../../lib/monthsDictionary"
import TransactionService from "../../services/Transaction/TransactionService"

import { NOT_DEFINE } from "../../constants"
import { selectMonth } from "../../storage/dateSlice"
import { setPage } from "../../storage/paginationSlice"
import { useAppDispatch, useAppSelector } from "../../storage/store"

export default function MonthlyResultsCard() {
    const date = useAppSelector(state => state.date);
    const requiredNote = useAppSelector(state => state.transaction.requiredNote);

    const dispatch = useAppDispatch();
    const transactionService = new TransactionService(dispatch);

    const months = date.dates[date.selectedYear] ? [ ...date.dates[date.selectedYear] ].reverse() : [];

    const changeMonthEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        transactionService.loadTransactions({ year: date.selectedYear, month: e.target.value, note: requiredNote, page: 0 });
        dispatch(selectMonth(e.target.value));
        dispatch(setPage(0));
    }

    return (
        <div className="uk-card uk-card-default uk-card-body uk-background-muted">
            <table className="uk-table uk-table-small">
                <tbody>
                    <tr>
                        <td><h1>Месяц</h1></td>
                        <td className="uk-text-right uk-width-1-3">
                            <select
                                className="uk-select uk-text-large"
                                onChange={changeMonthEvent}
                                defaultValue={date.selectedMonth}
                            >
                                <option>{NOT_DEFINE}</option>
                                {
                                    months.map(month => (
                                        <option key={month} value={month}>{monthsDictionary[month]}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                date.selectedMonth !== NOT_DEFINE
                ? <GeneralStatistics date={{ selectedYear: date.selectedYear, selectedMonth: date.selectedMonth }} />
                : ""
            }
        </div>
    );
}
