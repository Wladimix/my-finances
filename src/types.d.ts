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
    transactionAddressDeleted: 0 | 1
    spendingCategoryId: number
    spendingCategoryName: string
    spendingCategoryDeleted: 0 | 1
    note: string
    amount: number
    transactionType: string
    toCalculateStatistic: 0 | 1
    toCalculateInflation: 0 | 1
}

interface INote {
    id: number
    name: string
}

interface IFilter {
    year: string | null,
    month: string | null,
    note: string | null,
    page?: number
}

interface ITotalAmount {
    totalIncomeAmount: number,
    totalExpensditureAmount: number,
    savings: number
}

interface IStatisticsOfExpenses {
    purchase: string,
    amount: number
}

interface IRecordForInflation {
    date: number,
    note: string,
    amount: number
}

interface IInflationData {
    averageCost: {
        [key: string]: {
            [key: string]: number
        }
    },
    inflation: {
        [key: string]: {
            [key: string]: number
        }
    }
}

interface IRecordsSortedByDate {
    [key: string]: { note: string, amount: number }[]
}

type ResponceData<T> = {
    data: T | null
    error: string | null
};

interface EventPayloadMapping {

    getAllAccounts: [ undefined, Promise<ResponceData<IAccount[]>> ]
    addAccount: [ undefined, Promise<ResponceData<null>> ]
    editAccountName: [ { id: number, name: string }, Promise<ResponceData<null>> ]
    editAccountAmount: [ { id: number, amount: number }, Promise<ResponceData<null>> ]
    editAccountDeletionField: [ { id: number, isDeleted: 0 | 1 }, Promise<ResponceData<null>> ]

    getAllCategories: [ undefined, Promise<ResponceData<ICategory[]>> ]
    addCategory: [ undefined, Promise<ResponceData<null>> ]
    editCategoryName: [ { id: number, name: string }, Promise<ResponceData<null>> ]
    editCategoryDeletionField: [ { id: number, isDeleted: 0 | 1 }, Promise<ResponceData<null>> ]

    getAllTransactions: [ IFilter, Promise<ResponceData<ITransaction[]>> ]
    getAllYears: [ undefined, Promise<ResponceData<number[]>> ]
    getNumberOfTransactions: [ IFilter, Promise<ResponceData<number>> ]
    addTransaction: [ Date, Promise<ResponceData<null>> ]
    editTransactionDate: [ { id: number, date: Date }, Promise<ResponceData<null>> ]
    editSourceOfTransaction: [ { id: number, sourceOfTransactionId: number | null }, Promise<ResponceData<null>> ]
    editTransactionAddress: [ { id: number, transactionAddressId: number | null }, Promise<ResponceData<null>> ]
    editSpendingCategory: [ { id: number, spendingCategoryId: number | null }, Promise<ResponceData<null>> ]
    editTransactionNote: [ { id: number, note: string | null }, Promise<ResponceData<null>> ]
    editTransactionAmount: [ { id: number, amount: number }, Promise<ResponceData<null>> ]
    changeCalculateStatisticFlag: [ { id: number, flag: 0 | 1 }, Promise<ResponceData<null>> ]
    changeCalculateInflationFlag: [ { id: number, flag: 0 | 1 }, Promise<ResponceData<null>> ]
    deleteTransaction: [ number, Promise<ResponceData<null>> ]

    getNotes: [ string, Promise<ResponceData<INote[]>> ]

    getTotalAmount: [ { year: string, month: string | null }, Promise<ResponceData<ITotalAmount>> ]
    getStatisticsOnExpenses: [ { year: string, month: string | null }, Promise<ResponceData<IStatisticsOfExpenses[]>> ]
    getInflation: [string, Promise<ResponceData<IInflationData>>]

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
        editSourceOfTransaction: (data: { id: number, sourceOfTransactionId: number | null }) => Promise<ResponceData<null>>
        editTransactionAddress: (data: { id: number, transactionAddressId: number | null }) => Promise<ResponceData<null>>
        editSpendingCategory: (data: { id: number, spendingCategoryId: number | null }) => Promise<ResponceData<null>>
        editTransactionNote: (data: { id: number, note: string | null }) => Promise<ResponceData<null>>
        editTransactionAmount: (data: { id: number, amount: number }) => Promise<ResponceData<null>>
        changeCalculateStatisticFlag: (data: { id: number, flag: 0 | 1 }) => Promise<ResponceData<null>>
        changeCalculateInflationFlag: (data: { id: number, flag: 0 | 1 }) => Promise<ResponceData<null>>
        deleteTransaction: (id: number) => Promise<ResponceData<null>>

        getNotes: (substring: string) => Promise<ResponceData<INote[]>>

        getTotalAmount: (data: { year: string, month: string | null }) => Promise<ResponceData<ITotalAmount>>
        getStatisticsOnExpenses: (data: { year: string, month: string | null }) => Promise<ResponceData<IStatisticsOfExpenses[]>>
        getInflation: (year: string) => Promise<ResponceData<IInflationData>>

    }
}
