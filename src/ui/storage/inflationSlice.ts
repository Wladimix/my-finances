import { createSlice } from "@reduxjs/toolkit"

const initialState: InflationState = {}

const inflationSlice = createSlice({
    name: "inflation",
    initialState,
    reducers: {
        setInflation: (state, action) => action.payload
    }
});

export type InflationState = InflationDTO;

export const { setInflation } = inflationSlice.actions;
export default inflationSlice.reducer;
