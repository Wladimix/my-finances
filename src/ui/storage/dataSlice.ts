import { createSlice } from "@reduxjs/toolkit"

const initialState: dataState = {
    distributionFinancesTypes: [],
    spendingCategories: [],
    transactions: [],
    notes: []
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setDistributionTypes: (state, action) => ({ ...state, distributionFinancesTypes: action.payload }),
        setCategories: (state, action) => ({ ...state, spendingCategories: action.payload }),
        setTransactions: (state, action) => ({ ...state, transactions: action.payload }),
        setNotes: (state, action) => ({ ...state, notes: action.payload })
    }
});

export const { setDistributionTypes, setCategories, setTransactions, setNotes } = dataSlice.actions;
export default dataSlice.reducer;

export type dataState = {
    distributionFinancesTypes: GetDistributionTypeDTO[],
    spendingCategories: GetCategoryDTO[],
    transactions: GetTransactionDTO[],
    notes: GetNoteDTO[]
}
