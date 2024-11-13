import { ipcRenderer, contextBridge } from "electron";

const api: ElectronApi = {

    getAllDistributionTypes: () => ipcRenderer.invoke("getAllDistributionTypes"),
    addDistributionType: (distributionType: AddDistributionTypeDTO) => ipcRenderer.invoke("addDistributionType", distributionType),
    editDistributionType: (distributionType: EditDistributionTypeDTO) => ipcRenderer.invoke("editDistributionType", distributionType),
    deleteDistributionType: (distributionType: DeleteDistributionTypeDTO) => ipcRenderer.invoke("deleteDistributionType", distributionType),

    getAllCategories: () => ipcRenderer.invoke("getAllCategories"),
    addSpendingCategory: (spendingCategory: AddSpendingCategoryDTO) => ipcRenderer.invoke("addSpendingCategory", spendingCategory),
    editSpendingCategory: (spendingCategory: EditSpendingCategoryDTO) => ipcRenderer.invoke("editSpendingCategory", spendingCategory),
    deleteSpendingCategory: (spendingCategory: DeleteSpendingCategoryDTO) => ipcRenderer.invoke("deleteSpendingCategory", spendingCategory),

    getAllTransactions: (date: DateDTO) => ipcRenderer.invoke("getAllTransactions", date),
    getAllTransactionDates: () => ipcRenderer.invoke("getAllTransactionDates"),
    addTransaction: (transaction: AddTransactionDTO) => ipcRenderer.invoke("addTransaction", transaction),
    editTransaction: (transaction: EditTransactionDTO) => ipcRenderer.invoke("editTransaction", transaction),
    deleteTransaction: (transaction: DeleteTransactionDTO) => ipcRenderer.invoke("deleteTransaction", transaction),

    getNotes: (substring: string) => ipcRenderer.invoke("getNotes", substring),

    getCapital: () => ipcRenderer.invoke("getCapital"),
    getTotalAmount: (date: DateDTO) => ipcRenderer.invoke("getTotalAmount", date),
    getStatisticsOnExpenses: (date: DateDTO) => ipcRenderer.invoke("getStatisticsOnExpenses", date)

}

contextBridge.exposeInMainWorld("electron", api);