type GetDistributionTypeDTO = {
    id: number
    name: string
    amount: string
}

type AddDistributionTypeDTO = {
    name: string
    amount: string
}

type EditDistributionTypeDTO = {
    id: number
    name: string
    amount: string
}

type DeleteDistributionTypeDTO = EditDistributionTypeDTO

type GetCategoryDTO = {
    id: number
    name: string
}

type AddSpendingCategoryDTO = {
    name: string
}

type EditSpendingCategoryDTO = {
    id: number
    name: string
}

type DeleteSpendingCategoryDTO = EditSpendingCategoryDTO

type GetTransactionDTO = {
    id: number
    date: Date
    sourceOfTransactionId: number
    sourceOfTransactionName: string,
    sourceOfTransactionDeleted: boolean,
    transactionAddressId: number,
    transactionAddressName: string,
    spendingCategoryId: number,
    spendingCategoryName: string,
    spendingCategoryDeleted: boolean,
    note: string,
    amount: string,
    transactionType: string,
    toCalculateInflation: boolean
}

type GetDatesDTO = {
    [key: string]: number[]
}

type AddTransactionDTO = {
    date: Date,
    sourceOfTransactionId: number,
    transactionAddressId: number,
    spendingCategoryId: number,
    note: string,
    amount: string,
    transactionType: string,
    toCalculateInflation: boolean
}

type EditTransactionDTO = {
    id: number
    date: Date,
    sourceOfTransactionId: number,
    transactionAddressId: number,
    spendingCategoryId: number,
    note: string,
    amount: string,
    transactionType: string,
    toCalculateInflation: boolean
}

type DeleteTransactionDTO = EditTransactionDTO

type GetNoteDTO = {
    id: number
    name: string
}

type DateDTO = {
    year: string
    month: string
}

type TransactionFilter = {
    year: string
    month: string
    note: string
    page?: number
}

type TotalStatisticsDTO = {
    totalIncomeAmount: string
    totalExpenceAmount: string
    savings: string
}

type AmountOfExpenses = {
    purchase: string
    amount: string
}

type InflationDTO = {
    [key: string]: number
}

type ResponceData<T> = {
    data: T | null
    status: string
    message: string
}

interface EventPayloadMapping {

    getAllDistributionTypes: [undefined, Promise<ResponceData<GetDistributionTypeDTO[]>>],
    addDistributionType: [AddDistributionTypeDTO, Promise<ResponceData<number>>],
    editDistributionType: [EditDistributionTypeDTO, Promise<ResponceData<boolean>>],
    deleteDistributionType: [DeleteDistributionTypeDTO, Promise<ResponceData<boolean>>],

    getAllCategories: [undefined, Promise<ResponceData<GetCategoryDTO[]>>],
    addSpendingCategory: [AddSpendingCategoryDTO, Promise<ResponceData<number>>],
    editSpendingCategory: [EditSpendingCategoryDTO, Promise<ResponceData<boolean>>],
    deleteSpendingCategory: [DeleteSpendingCategoryDTO, Promise<ResponceData<boolean>>],

    getAllTransactions: [TransactionFilter, Promise<ResponceData<GetTransactionDTO[]>>],
    getAllTransactionDates: [undefined, Promise<ResponceData<GetDatesDTO>>],
    getNumberOfTransactions: [TransactionFilter, Promise<ResponceData<number>>],
    addTransaction: [AddTransactionDTO, Promise<ResponceData<number>>],
    editTransaction: [EditTransactionDTO, Promise<ResponceData<boolean>>],
    deleteTransaction: [DeleteTransactionDTO, Promise<ResponceData<boolean>>],

    getNotes: [string, Promise<ResponceData<GetNoteDTO[]>>],

    getCapital: [undefined, Promise<ResponceData<string>>],
    getTotalAmount: [DateDTO, Promise<ResponceData<TotalStatisticsDTO>>],
    getStatisticsOnExpenses: [DateDTO, Promise<ResponceData<AmountOfExpenses[]>>],
    getInflationData: [number, Promise<ResponceData<InflationDTO>>],

}

interface Window {
    electron: {

        getAllDistributionTypes: () => Promise<ResponceData<GetDistributionTypeDTO[]>>
        addDistributionType: (distributionType: AddDistributionTypeDTO) => Promise<ResponceData<number>>
        editDistributionType: (distributionType: EditDistributionTypeDTO) => Promise<ResponceData<boolean>>,
        deleteDistributionType: (distributionType: DeleteDistributionTypeDTO) => Promise<ResponceData<boolean>>,

        getAllCategories: () => Promise<ResponceData<GetCategoryDTO[]>>
        addSpendingCategory: (spendingCategory: AddSpendingCategoryDTO) => Promise<ResponceData<number>>,
        editSpendingCategory: (spendingCategory: EditSpendingCategoryDTO) => Promise<ResponceData<boolean>>,
        deleteSpendingCategory: (spendingCategory: DeleteSpendingCategoryDTO) => Promise<ResponceData<boolean>>,


        getAllTransactions: (filter: TransactionFilter) => Promise<ResponceData<GetTransactionDTO[]>>
        getAllTransactionDates: () => Promise<ResponceData<GetDatesDTO>>
        getNumberOfTransactions: (filter: TransactionFilter) => Promise<ResponceData<number>>
        addTransaction: (transaction: AddTransactionDTO) => Promise<ResponceData<number>>
        editTransaction: (transaction: EditTransactionDTO) => Promise<ResponceData<boolean>>
        deleteTransaction: (transaction: DeleteTransactionDTO) => Promise<ResponceData<boolean>>


        getNotes: (substring: string) => Promise<ResponceData<GetNoteDTO[]>>

        getCapital: () => Promise<ResponceData<string>>
        getTotalAmount: (date: DateDTO) => Promise<ResponceData<TotalStatisticsDTO>>
        getStatisticsOnExpenses: (date: DateDTO) => Promise<ResponceData<AmountOfExpenses[]>>
        getInflationData: (year: number) => Promise<ResponceData<InflationDTO>>

    }
}
