import DatePicker from "react-datepicker"

import { ru } from "date-fns/locale/ru"
import { setTransactionData } from "../../storage/transactionSlice"
import { useAppDispatch, useAppSelector } from "../../storage/store"

import "react-datepicker/dist/react-datepicker.css"

export default function DateInput() {
    const transactionData = useAppSelector(state => state.transaction.transactionData);

    const dispatch = useAppDispatch();

    const changeDateEvent = (date: Date | null): void => {
        if (date && date.getFullYear() <= new Date().getFullYear()) {
            dispatch(setTransactionData({ ...transactionData, date }));
        }
    }

    return (
        <div className="uk-margin">
            <label className="uk-form-label" htmlFor="transaction-date">Дата транзакции</label>
            <div className="uk-form-controls">
                <DatePicker
                    className="uk-input"
                    dateFormat="dd MMMM YYYY HH:mm"
                    id="transaction-date"
                    locale={ru}
                    onChange={changeDateEvent}
                    selected={transactionData.date}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="Время"
                />
            </div>
        </div>
    );
}
