import NoteService from "../services/NoteService"

import { createSlice } from "@reduxjs/toolkit"
import { NOT_DEFINE, TransactionEvent, TransactionsTypes, VALUE_MISSING } from "../constants"

const initialState: transactionState = {
    eventType: TransactionEvent.ADD,
    loader: false,
    id: 0,
    requiredNote: "",
    transactionData: {
        date: new Date(),
        sourceOfTransactionId: 1,
        transactionAddressId: 1,
        spendingCategoryId: 1,
        note: VALUE_MISSING,
        amount: "",
        transactionType: "type",
        toCalculateInflation: false
    }
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        setEventType: (state, action) => ({ ...state, eventType: action.payload }),
        setTransactionLoader: (state, action) => ({ ...state, loader: action.payload }),
        setTransactionId: (state, action) => ({ ...state, id: action.payload }),
        setRequiredNote: (state, action) => ({ ...state, requiredNote: action.payload }),
        setTransactionData: (state, action) => ({ ...state, transactionData: processTransactionData(action.payload) })
    }
});

const processTransactionData = (data: AddTransactionDTO) => {
    return {
        ...data,
        note: new NoteService().processNote(data.note),
        transactionType: determineTransactionType(data)
    }
}

const determineTransactionType = (transactionData: AddTransactionDTO): TransactionsTypes | typeof NOT_DEFINE => {
    const income = transactionData.sourceOfTransactionId === 1
        && transactionData.transactionAddressId !== 1
        && transactionData.spendingCategoryId === 1
        && transactionData.amount;

    const transfer = transactionData.sourceOfTransactionId !== 1
        && transactionData.transactionAddressId !== 1
        && transactionData.sourceOfTransactionId !== transactionData.transactionAddressId
        && transactionData.spendingCategoryId === 1
        && transactionData.amount;

    const expence = transactionData.sourceOfTransactionId !== 1
        && transactionData.transactionAddressId === 1
        && transactionData.spendingCategoryId !== 1
        && transactionData.amount;

    const priceMonitoring = transactionData.sourceOfTransactionId === 1
        && transactionData.transactionAddressId === 1
        && transactionData.spendingCategoryId === 1
        && (transactionData.note && transactionData.note !== " " && transactionData.note !== VALUE_MISSING)
        && transactionData.amount;

    return income ? TransactionsTypes.FINANCIAL_INCOME : transfer ? TransactionsTypes.FINANCIAL_TRANSFER : expence ? TransactionsTypes.FINANCIAL_EXPENCE : priceMonitoring ? TransactionsTypes.PRICE_MONITORING : NOT_DEFINE;
}

export const { setEventType, setTransactionLoader, setTransactionId, setRequiredNote, setTransactionData } = transactionSlice.actions;
export default transactionSlice.reducer;

export type transactionState = {
    eventType: TransactionEvent
    loader: boolean
    id: number
    requiredNote: string
    transactionData: AddTransactionDTO
}
