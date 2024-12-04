import TransactionFormService from "../../services/Transaction/TransactionFormService"

import { ModifierId } from "../../constants"
import { setTransactionData } from "../../storage/transactionSlice"
import { useAppDispatch, useAppSelector } from "../../storage/store"

export default function AddressOrCategoryInput() {
    const transactionData = useAppSelector(state => state.transaction.transactionData);
    const distribytionTypes = useAppSelector(state => state.data.distributionFinancesTypes);
    const spendingCategories = useAppSelector(state => state.data.spendingCategories);

    const dispatch = useAppDispatch();
    const transactionFormService = new TransactionFormService(transactionData);

    const changeAddressOrCategoryEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        dispatch(setTransactionData({
            ...transactionData,
            ...transactionFormService.identifyAndGetAddressOrCategoryToSend(e.target.value),
            toCalculateInflation: false
        }));
    }

    return (
        <div className="uk-margin">
            <label className="uk-form-label" htmlFor="address-or-category">Адрес / Категория</label>
            <div className="uk-form-controls">
                <select
                    className="uk-select"
                    id="address-or-category"
                    onChange={changeAddressOrCategoryEvent}
                    spellCheck="false"
                    value={transactionFormService.showAddressOrCategory()}
                >

                    <option value={1}>значение не выбрано</option>
                    {
                        distribytionTypes.map(distributionType => (
                            <option
                                className="uk-text-success"
                                key={distributionType.id}
                                value={ModifierId.DISTRIBUTION_ID + distributionType.id}
                            >
                                {distributionType.name}
                            </option>
                        ))
                    }
                    {
                        spendingCategories.map(spendingCategory => (
                            <option
                                className="uk-text-danger"
                                key={spendingCategory.id}
                                value={ModifierId.SPENDING_CATEGORY_ID + spendingCategory.id}
                            >
                                {spendingCategory.name}
                            </option>
                        ))
                    }

                </select>
            </div>
        </div>
    );
}
