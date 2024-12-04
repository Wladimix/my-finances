import dataReducer from "./dataSlice"
import dateReducer from "./dateSlice"
import inflationReducer from "./inflationSlice"
import paginationReducer from './paginationSlice'
import transactionReducer from "./transactionSlice"

import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
    reducer: {
        data: dataReducer,
        date: dateReducer,
        pagination: paginationReducer,
        transaction: transactionReducer,
        inflation: inflationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
