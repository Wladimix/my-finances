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

type getAllAccountsRes = Promise<ResponceData<IAccount[]>>;
type addAccountRes = Promise<ResponceData<null>>;
type editAccountNameRes = Promise<ResponceData<null>>;

interface EventPayloadMapping {

    getAllAccounts: [undefined, getAllAccountsRes]
    addAccount: [undefined, addAccountRes]
    editAccountName: [{ id: number, name: string }, editAccountNameRes]

}

interface Window {
    electron: {

        getAllAccounts: () => getAllAccountsRes
        addAccount: () => addAccountRes
        editAccountName: ({ id: number, name: string }) => editAccountNameRes

    }
}
