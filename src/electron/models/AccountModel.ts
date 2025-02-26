import knex from '../connectionDB';

import { NewEntities, TablesNames } from '../constants';

class AccountModel {

    async createTable(): Promise<void> {
        await knex.schema
            .createTable(TablesNames.ACCOUNT, table => {
                table.increments('id');
                table.string('name', 50).notNullable().defaultTo(NewEntities.NEW_ACCOUNT);
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
            .whereNot({ is_deleted: true })
            .from(TablesNames.ACCOUNT)
            .orderBy('name', 'asc');
    }

    async getOneById(id: number): Promise<IAccount | undefined> {
        return await knex(TablesNames.ACCOUNT)
            .where({ id })
            .whereNot({ is_deleted: true })
            .first();
    }

    async getOneByName(name: string): Promise<IAccount | undefined> {
        return await knex(TablesNames.ACCOUNT)
            .where({ name })
            .whereNot({ is_deleted: true })
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

    async editDeletionFieldById(id: number, name: string, isDeleted: 0 | 1): Promise<void> {
        await knex(TablesNames.ACCOUNT)
            .where({ id })
            .update({
                name,
                is_deleted: isDeleted
            });
    }

}

export default new AccountModel();
