import { createSlice } from "@reduxjs/toolkit"
import { NOT_DEFINE } from "../constants"

const initialState: dateState = {
    dates: {},
    selectedYear: NOT_DEFINE,
    selectedMonth: NOT_DEFINE
}

const transactionSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        setDates: (state, action) => ({ ...state, dates: action.payload }),
        selectYear: (state, action) => ({ ...state, selectedYear: action.payload }),
        selectMonth: (state, action) => ({ ...state, selectedMonth: action.payload })
    }
});

type dateState = {
    dates: GetDatesDTO
    selectedYear: string
    selectedMonth: string
}

export const { setDates, selectYear, selectMonth } = transactionSlice.actions;
export default transactionSlice.reducer;
