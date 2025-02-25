import knex from '../connectionDB';

import { NEW_ACCOUNT, TablesNames } from '../constants';

class AccountModel {

    async createTable(): Promise<void> {
        await knex.schema
            .createTable(TablesNames.ACCOUNT, table => {
                table.increments('id');
                table.string('name', 50).notNullable().defaultTo(NEW_ACCOUNT);
                table.float('amount', 2).notNullable().defaultTo(0.00);
                table.boolean('is_deleted').notNullable().defaultTo(0);
                table.unique('name');
            });
    }

    async getAll(): Promise<IAccount[]> {
        return await knex
            .select(
                'id',
                'name',
                'amount',
                'is_deleted as isDeleted'
            )
            .from(TablesNames.ACCOUNT)
            .orderBy('name', 'asc');
    }

    async getOneByName(name: string): Promise<IAccount | undefined> {
        return await knex(TablesNames.ACCOUNT)
            .where({ name })
            .first();
    }

    async add(): Promise<void> {
        await knex(TablesNames.ACCOUNT).insert({});
    }

    async editNameById(id: number, name: string): Promise<void> {
        await knex(TablesNames.ACCOUNT)
            .where({ id })
            .update({ name });
    }

    async editAmountById(id: number, amount: number): Promise<void> {
        await knex(TablesNames.ACCOUNT)
            .where({ id })
            .update({ amount });
    }

}

export default new AccountModel();
