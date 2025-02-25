interface IAccount {
    id: number;
    name: string;
    amount: number;
    isDeleted: boolean;
}

type ResponceData<T> = {
    data: T | null,
    error: string | null
}

type addAccountRes = Promise<ResponceData<null>>;

interface EventPayloadMapping {

    addAccount: [undefined, addAccountRes]

}

interface Window {
    electron: {

        addAccount: () => addAccountRes

    }
}
