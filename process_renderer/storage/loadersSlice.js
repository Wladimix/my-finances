import { createSlice } from "@reduxjs/toolkit";

const setStateObject = keyStateObject => (
    (state, action) => ({ ...state, [keyStateObject]: action.payload })
);

const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {

        addingDistributionFinancesLoader: false,
        editingDistributionFinancesLoader: false,

        addingSpendingCategoryLoader: false,
        editingSpendingCategoryLoader: false,

        transactionsLoader: false,
        addingTransactionLoader: false,
        editingTransactionLoader: false,

    },
    reducers: {

        setAddingDistributionLoader: setStateObject("addingDistributionFinancesLoader"),
        setEditingDistributionLoader: setStateObject("editingDistributionFinancesLoader"),

        setAddingCategoryLoader: setStateObject("addingSpendingCategoryLoader"),
        setEditingCategoryLoader: setStateObject("editingSpendingCategoryLoader"),

        setTransactionsLoader: setStateObject("transactionsLoader"),
        setAddingTransactionLoader: setStateObject("addingTransactionLoader"),
        setEditingTransactionLoader: setStateObject("editingTransactionLoader")

    }
});

export const {

    setAddingDistributionLoader,
    setEditingDistributionLoader,

    setAddingCategoryLoader,
    setEditingCategoryLoader,

    setTransactionsLoader,
    setAddingTransactionLoader,
    setEditingTransactionLoader

} = loadersSlice.actions;

export default loadersSlice.reducer;