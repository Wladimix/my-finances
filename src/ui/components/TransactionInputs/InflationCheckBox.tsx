import { setTransactionData } from "../../storage/transactionSlice"
import { TransactionsTypes, VALUE_MISSING } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../storage/store"

export default function InflationCheckBox() {
    const transactionData = useAppSelector(state => state.transaction.transactionData);

    const dispatch = useAppDispatch();

    const changeCheckBoxEvent = () => {
        dispatch(setTransactionData(
            { ...transactionData, toCalculateInflation: !transactionData.toCalculateInflation }
        ));
    }

    const isHidden = (transactionData.note && transactionData.note !== VALUE_MISSING) &&
        ((transactionData.transactionType === TransactionsTypes.FINANCIAL_EXPENCE) ||
        (transactionData.transactionType === TransactionsTypes.PRICE_MONITORING));

    return (
        <>
            {
                isHidden &&
                <label>
                    <input
                        checked={transactionData.toCalculateInflation}
                        className="uk-checkbox"
                        onChange={changeCheckBoxEvent}
                        type="checkbox"
                    /> Рассчитать инфляцию
                </label>
            }
        </>
    );
}
