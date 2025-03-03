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

    getAllTransactions: () => ipcInvoke('getAllTransactions'),
    getAllYears: () => ipcInvoke('getAllYears'),
    addTransaction: (date: Date) => ipcInvoke('addTransaction', date),
    editTransactionDate: (data: { id: number, date: Date }) => ipcInvoke('editTransactionDate', data)

} satisfies Window['electron']);
