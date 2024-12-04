import { createSlice } from "@reduxjs/toolkit"

const paginationSlice = createSlice({
    name: "pagination",
    initialState: 0,
    reducers: {
        setPage: (state, action) => action.payload
    }
});

export const { setPage } = paginationSlice.actions;
export default paginationSlice.reducer;
