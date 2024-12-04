import { ipcRenderer, contextBridge } from "electron"

function ipcInvoke<Channel extends keyof EventPayloadMapping>(
    key: Channel,
    payload?: EventPayloadMapping[Channel][0]
): EventPayloadMapping[Channel][1] {
    return ipcRenderer.invoke(key, payload)
}

contextBridge.exposeInMainWorld("electron", {

    getAllDistributionTypes: () => ipcInvoke("getAllDistributionTypes"),
    addDistributionType: (distributionType: AddDistributionTypeDTO) => ipcInvoke("addDistributionType", distributionType),
    editDistributionType: (distributionType: EditDistributionTypeDTO) => ipcInvoke("editDistributionType", distributionType),
    deleteDistributionType: (distributionType: DeleteDistributionTypeDTO) => ipcInvoke("deleteDistributionType", distributionType),

    getAllCategories: () => ipcInvoke("getAllCategories"),
    addSpendingCategory: (spendingCategory: AddSpendingCategoryDTO) => ipcInvoke("addSpendingCategory", spendingCategory),
    editSpendingCategory: (spendingCategory: EditSpendingCategoryDTO) => ipcInvoke("editSpendingCategory", spendingCategory),
    deleteSpendingCategory: (spendingCategory: DeleteSpendingCategoryDTO) => ipcInvoke("deleteSpendingCategory", spendingCategory),

    getAllTransactions: (filter: TransactionFilter) => ipcInvoke("getAllTransactions", filter),
    getAllTransactionDates: () => ipcInvoke("getAllTransactionDates"),
    getNumberOfTransactions: (filter: TransactionFilter) => ipcInvoke("getNumberOfTransactions", filter),
    addTransaction: (transaction: AddTransactionDTO) => ipcInvoke("addTransaction", transaction),
    editTransaction: (transaction: EditTransactionDTO) => ipcInvoke("editTransaction", transaction),
    deleteTransaction: (transaction: DeleteTransactionDTO) => ipcInvoke("deleteTransaction", transaction),

    getNotes: (substring: string) => ipcInvoke("getNotes", substring),

    getCapital: () => ipcInvoke("getCapital"),
    getTotalAmount: (date: DateDTO) => ipcInvoke("getTotalAmount", date),
    getStatisticsOnExpenses: (date: DateDTO) => ipcInvoke("getStatisticsOnExpenses", date),
    getInflationData: (year: number) => ipcInvoke("getInflationData", year)

} satisfies Window["electron"]);
