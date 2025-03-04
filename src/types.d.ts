interface IAccount {
    id: number
    name: string
    amount: number
    isDeleted: 0 | 1
}

interface ICategory {
    id: number
    name: string
    isDeleted: 0 | 1
}

interface ITransaction {
    id: number
    date: string
    sourceOfTransactionId: number
    sourceOfTransactionName: string
    sourceOfTransactionDeleted: 0 | 1
    transactionAddressId: number
    transactionAddressName: string
    spendingCategoryId: number
    spendingCategoryName: string
    spendingCategoryDeleted: 0 | 1
    amount: number
    transactionType: string
}

interface IFilter {
    year: string | null,
    month: string | null,
    page?: number
}

type ResponceData<T> = {
    data: T | null
    error: string | null
};

interface EventPayloadMapping {

    getAllAccounts: [undefined, Promise<ResponceData<IAccount[]>>]
    addAccount: [undefined, Promise<ResponceData<null>>]
    editAccountName: [{ id: number, name: string }, Promise<ResponceData<null>>]
    editAccountAmount: [{ id: number, amount: number }, Promise<ResponceData<null>>]
    editAccountDeletionField: [{ id: number, isDeleted: 0 | 1 }, Promise<ResponceData<null>>]

    getAllCategories: [undefined, Promise<ResponceData<ICategory[]>>]
    addCategory: [undefined, Promise<ResponceData<null>>]
    editCategoryName: [{ id: number, name: string }, Promise<ResponceData<null>>]
    editCategoryDeletionField: [{ id: number, isDeleted: 0 | 1 }, Promise<ResponceData<null>>]

    getAllTransactions: [IFilter, Promise<ResponceData<ITransaction[]>>]
    getAllYears: [undefined, Promise<ResponceData<number[]>>]
    getNumberOfTransactions: [IFilter, Promise<ResponceData<number>>]
    addTransaction: [Date, Promise<ResponceData<null>>]
    editTransactionDate: [{ id: number, date: Date }, Promise<ResponceData<null>>]

}

interface Window {
    electron: {

        getAllAccounts: () => Promise<ResponceData<IAccount[]>>
        addAccount: () => Promise<ResponceData<null>>
        editAccountName: (data: { id: number, name: string }) => Promise<ResponceData<null>>
        editAccountAmount: (data: { id: number, amount: number }) => Promise<ResponceData<null>>
        editAccountDeletionField: (data: { id: number, isDeleted: 0 | 1 }) => Promise<ResponceData<null>>

        getAllCategories: () => Promise<ResponceData<ICategory[]>>
        addCategory: () => Promise<ResponceData<null>>
        editCategoryName: (data: { id: number, name: string }) => Promise<ResponceData<null>>
        editCategoryDeletionField: (data: { id: number, isDeleted: 0 | 1 }) => Promise<ResponceData<null>>

        getAllTransactions: (filter: IFilter) => Promise<ResponceData<ITransaction[]>>
        getAllYears: () => Promise<ResponceData<number[]>>
        getNumberOfTransactions: (filter: IFilter) => Promise<ResponceData<number>>
        addTransaction: (date: Date) => Promise<ResponceData<null>>
        editTransactionDate: (data: { id: number, date: Date }) => Promise<ResponceData<null>>

    }
}
