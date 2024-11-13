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
interface IDistributionController {
    getAllDistributionTypes: () => Promise<ResponceData<GetDistributionTypeDTO[]>>
    addDistributionType: (event: Electron.IpcMainInvokeEvent, distributionType: AddDistributionTypeDTO) => Promise<ResponceData<number>>
    editDistributionType: (event: Electron.IpcMainInvokeEvent, distributionType: EditDistributionTypeDTO) => Promise<ResponceData<boolean>>
    deleteDistributionType: (event: Electron.IpcMainInvokeEvent, distributionType: DeleteDistributionTypeDTO) => Promise<ResponceData<boolean>>
}




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
interface ICategoryController {
    getAllCategories: () => Promise<ResponceData<GetCategoryDTO[]>>
    addSpendingCategory: (event: Electron.IpcMainInvokeEvent, spendingCategory: AddSpendingCategoryDTO) => Promise<ResponceData<number>>
    editSpendingCategory(event: Electron.IpcMainInvokeEvent, spendingCategory: EditSpendingCategoryDTO): Promise<ResponceData<boolean>>
    deleteSpendingCategory(event: Electron.IpcMainInvokeEvent, spendingCategory: DeleteSpendingCategoryDTO): Promise<ResponceData<boolean>>
}




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
    transactionType: string
};
type GetDatesDTO = {
    [key: string]: number[]
};
type AddTransactionDTO = {
    date: Date,
    sourceOfTransactionId: number,
    transactionAddressId: number,
    spendingCategoryId: number,
    note: string,
    amount: string,
    transactionType: string
}
type EditTransactionDTO = {
    id: number
    date: Date,
    sourceOfTransactionId: number,
    transactionAddressId: number,
    spendingCategoryId: number,
    note: string,
    amount: string,
    transactionType: string
}
type DeleteTransactionDTO = EditTransactionDTO
interface ITransactionController {
    getAllTransactions: (event: Electron.IpcMainInvokeEvent, date: DateDTO) => Promise<ResponceData<GetTransactionDTO[]>>
    getAllTransactionDates: () => Promise<ResponceData<GetDatesDTO>>
    addTransaction: (event: Electron.IpcMainInvokeEvent, transaction: AddTransactionDTO) => Promise<ResponceData<number>>
    editTransaction: (event: Electron.IpcMainInvokeEvent, transaction: EditTransactionDTO) => Promise<ResponceData<boolean>>
    deleteTransaction: (event: Electron.IpcMainInvokeEvent, transaction: DeleteTransactionDTO) => Promise<ResponceData<boolean>>
}



type GetNoteDTO = {
    id: number
    name: string
}
interface INoteController {
    getNotes: (event: Electron.IpcMainInvokeEvent, substring: string) => Promise<ResponceData<GetNoteDTO[]>>
}



type DateDTO = {
    year: string
    month: string
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
interface ICalculationController {
    getCapital: () => Promise<ResponceData<string>>
    getTotalAmount: (event: Electron.IpcMainInvokeEvent, date: DateDTO) => Promise<ResponceData<TotalStatisticsDTO>>
    getStatisticsOnExpenses: (event: Electron.IpcMainInvokeEvent, date) => Promise<ResponceData<AmountOfExpenses[]>>
}




interface IController extends
    IDistributionController,
    ICategoryController,
    ITransactionController,
    INoteController,
    ICalculationController
{}




type ResponceData<T> = {
    data: T | null
    status: string
    message: string
}




type ElectronApi = {

    getAllDistributionTypes: () => Promise<ResponceData<GetDistributionTypeDTO[]>>
    addDistributionType: (distributionType: AddDistributionTypeDTO) => Promise<ResponceData<number>>
    editDistributionType: (distributionType: EditDistributionTypeDTO) => Promise<ResponceData<boolean>>,
    deleteDistributionType: (distributionType: DeleteDistributionTypeDTO) => Promise<ResponceData<boolean>>,

    getAllCategories: () => Promise<ResponceData<GetCategoryDTO[]>>
    addSpendingCategory: (spendingCategory: AddSpendingCategoryDTO) => Promise<ResponceData<number>>,
    editSpendingCategory: (spendingCategory: EditSpendingCategoryDTO) => Promise<ResponceData<boolean>>,
    deleteSpendingCategory: (spendingCategory: DeleteSpendingCategoryDTO) => Promise<ResponceData<boolean>>,


    getAllTransactions: (date: DateDTO) => Promise<ResponceData<GetTransactionDTO[]>>
    getAllTransactionDates: () => Promise<ResponceData<any>>
    addTransaction: (transaction: AddTransactionDTO) => Promise<ResponceData<number>>
    editTransaction: (transaction: EditTransactionDTO) => Promise<ResponceData<boolean>>
    deleteTransaction: (transaction: DeleteTransactionDTO) => Promise<ResponceData<boolean>>


    getNotes: (substring: string) => Promise<ResponceData<GetNoteDTO[]>>

    getCapital: () => Promise<ResponceData<string>>
    getTotalAmount: (date: DateDTO) => Promise<ResponceData<TotalStatisticsDTO>>
    getStatisticsOnExpenses: (date) => Promise<ResponceData<AmountOfExpenses[]>>

}




interface Window {
    electron: ElectronApi
}