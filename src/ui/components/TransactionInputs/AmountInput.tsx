import { setTransactionData } from "../../storage/transactionSlice"
import { useAppDispatch, useAppSelector } from "../../storage/store"

export default function AmountInput() {
    const transactionData = useAppSelector(state => state.transaction.transactionData);

    const dispatch = useAppDispatch();

    const changeAmountEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTransactionData(
            { ...transactionData, amount: e.target.value }
        ));
    }

    return (
        <div className="uk-margin">
            <label className="uk-form-label" htmlFor="price">Сумма / Цена</label>
            <div className="uk-form-controls">
                <input
                    className="uk-input"
                    id="price"
                    onChange={changeAmountEvent}
                    spellCheck="false"
                    type="text"
                    value={transactionData.amount}
                />
            </div>
        </div>
    );
}
