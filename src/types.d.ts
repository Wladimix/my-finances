interface IAccount {
    id: number
    name: string
    amount: number
    isDeleted: boolean
}

type ResponceData<T> = {
    data: T | null
    error: string | null
};

type getAllAccountsRes = Promise<ResponceData<IAccount[]>>;
type addAccountRes = Promise<ResponceData<null>>;

interface EventPayloadMapping {

    getAllAccounts: [undefined, getAllAccountsRes]
    addAccount: [undefined, addAccountRes]

}

interface Window {
    electron: {

        getAllAccounts: () => getAllAccountsRes
        addAccount: () => addAccountRes

    }
}
