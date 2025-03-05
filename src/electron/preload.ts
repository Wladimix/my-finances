import { ipcRenderer, contextBridge } from 'electron';

function ipcInvoke<Channel extends keyof EventPayloadMapping>(
    key: Channel,
    payload?: EventPayloadMapping[Channel][0]
): EventPayloadMapping[Channel][1] {
    return ipcRenderer.invoke(key, payload);
}

contextBridge.exposeInMainWorld('electron', {

    getAllAccounts: () => ipcInvoke('getAllAccounts'),
    addAccount: () => ipcInvoke('addAccount'),
    editAccountName: (data: { id: number, name: string }) => ipcInvoke('editAccountName', data),
    editAccountAmount: (data: { id: number, amount: number }) => ipcInvoke('editAccountAmount', data),
    editAccountDeletionField: (data: { id: number; isDeleted: 0 | 1; }) => ipcInvoke('editAccountDeletionField', data),

    getAllCategories: () => ipcInvoke('getAllCategories'),
    addCategory: () => ipcInvoke('addCategory'),
    editCategoryName: (data: { id: number, name: string }) => ipcInvoke('editCategoryName', data),
    editCategoryDeletionField: (data: { id: number; isDeleted: 0 | 1; }) => ipcInvoke('editCategoryDeletionField', data),

    getAllTransactions: (filter: IFilter) => ipcInvoke('getAllTransactions', filter),
    getAllYears: () => ipcInvoke('getAllYears'),
    getNumberOfTransactions: (filter: IFilter) => ipcInvoke('getNumberOfTransactions', filter),
    addTransaction: (date: Date) => ipcInvoke('addTransaction', date),
    editTransactionDate: (data: { id: number, date: Date }) => ipcInvoke('editTransactionDate', data),
    editSourceOfTransaction: (data: { id: number, sourceOfTransactionId: number | null }) => ipcInvoke('editSourceOfTransaction', data),
    editTransactionAddress: (data: { id: number, transactionAddressId: number | null }) => ipcInvoke('editTransactionAddress', data),
    editSpendingCategory: (data: { id: number, spendingCategoryId: number | null }) => ipcInvoke('editSpendingCategory', data),
    deleteTransaction: (id: number) => ipcInvoke('deleteTransaction', id)

} satisfies Window['electron']);
