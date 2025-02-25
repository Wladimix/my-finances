import AccountModel from '../models/AccountModel';

import { NEW_ACCOUNT } from '../constants';

export default class Account {

    private id: number | null;
    private name: string | null;
    private amount: number | null;
    private isDeleted: boolean;

    constructor(
        id: number | null = null,
        name: string | null = null,
        amount: number | null = null,
        isDeleted: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.isDeleted = isDeleted;
    }

    async getAll(): Promise<IAccount[]> {
        return await AccountModel.getAll();
    }

    async add(): Promise<void> {
        const account = await AccountModel.getOneByName(NEW_ACCOUNT);

        if (account !== undefined) {
            throw new Error('такой счёт уже существует');
        }

        await AccountModel.add();
    }

}
