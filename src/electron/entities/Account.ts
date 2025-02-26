import AccountModel from '../models/AccountModel';

import { NewEntities } from '../constants';

export default class Account {

    id: number;
    name: string;
    amount: number;
    isDeleted:  0 | 1;

    constructor(
        id: number | null = null,
        name: string | null = null,
        amount: number | null = null,
        isDeleted:  0 | 1 = 0
    ) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.amount = amount ?? 0.00;
        this.isDeleted = isDeleted;
    }

    async getAll(): Promise<IAccount[]> {
        return await AccountModel.getAll();
    }

    async add(): Promise<void> {
        const account = await AccountModel.getOneByName(NewEntities.NEW_ACCOUNT);

        if (account !== undefined) {
            throw new Error('такой счёт уже существует');
        }

        await AccountModel.add();
    }

    async editName(id: number, name: string): Promise<void> {
        if (this.id) {

            const existingAccount = await AccountModel.getOneByName(name);

            if (existingAccount !== undefined) {
                throw new Error('такой счёт уже существует');
            }

            await AccountModel.editNameById(id, name);

        }
    }

    async editAmount(id: number, amount: number): Promise<void> {
        if (this.id) {
            await AccountModel.editAmountById(id, amount);
        }
    }

}
