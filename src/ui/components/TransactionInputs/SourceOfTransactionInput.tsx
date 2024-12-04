import { setTransactionData } from "../../storage/transactionSlice"
import { useAppDispatch, useAppSelector } from "../../storage/store"

export default function SourceOfTransactionInput() {
    const transactionData = useAppSelector(state => state.transaction.transactionData);
    const distribytionTypes = useAppSelector(state => state.data.distributionFinancesTypes);

    const dispatch = useAppDispatch();

    const changeSourceOfTransactionEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(setTransactionData({
            ...transactionData,
            sourceOfTransactionId: Number(e.target.value),
            toCalculateInflation: false
        }));
    }

    return (
        <div className="uk-margin">
            <label className="uk-form-label" htmlFor="source-of-transaction">Источник транзакции</label>
            <div className="uk-form-controls">
                <select
                    className="uk-select"
                    id="source-of-transaction"
                    onChange={changeSourceOfTransactionEvent}
                    spellCheck="false"
                    value={transactionData.sourceOfTransactionId}
                >

                    <option value={1}>значение не выбрано</option>
                    {
                        distribytionTypes.map(distributionType => (
                            <option
                                key={distributionType.id}
                                value={distributionType.id}
                            >
                                {distributionType.name}
                            </option>
                        ))
                    }

                </select>
            </div>
        </div>
    );
}
