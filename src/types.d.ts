interface IAccount {
    id: number
    name: string
    amount: number
    isDeleted: 0 | 1
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

}

type test = {
    id: number, amount: number
}

interface Window {
    electron: {

        getAllAccounts: () => Promise<ResponceData<IAccount[]>>
        addAccount: () => Promise<ResponceData<null>>
        editAccountName: (data: { id: number, name: string }) => Promise<ResponceData<null>>
        editAccountAmount: (data: { id: number, amount: number }) => Promise<ResponceData<null>>
        editAccountDeletionField: (data: { id: number, isDeleted: 0 | 1 }) => Promise<ResponceData<null>>

    }
}
