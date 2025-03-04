import knex from '../connectionDB';

import { NewEntities, TablesNames } from '../constants';

export default class AccountModel {

    static async createTable(): Promise<void> {
        await knex.schema
            .createTable(TablesNames.ACCOUNTS, table => {
                table.increments('id');
                table.string('name', 50).notNullable().defaultTo(NewEntities.NEW_ACCOUNT);
                table.float('amount', 2).notNullable().defaultTo(0.00);
                table.boolean('is_deleted').notNullable().defaultTo(0);
                table.unique('name');
            });
    }

    static async getAll(): Promise<IAccount[]> {
        return await knex
            .select(
                'id',
                'name',
                'amount',
                'is_deleted as isDeleted'
            )
            .whereNot({ is_deleted: true })
            .from(TablesNames.ACCOUNTS)
            .orderBy('name', 'asc');
    }

    static async getOneById(id: number): Promise<IAccount | undefined> {
        return await knex(TablesNames.ACCOUNTS)
            .where({ id })
            .whereNot({ is_deleted: true })
            .first();
    }

    static async getOneByName(name: string): Promise<IAccount | undefined> {
        return await knex(TablesNames.ACCOUNTS)
            .where({ name })
            .whereNot({ is_deleted: true })
            .first();
    }

    static async add(): Promise<void> {
        await knex(TablesNames.ACCOUNTS).insert({});
    }

    static async editNameById(id: number, name: string): Promise<void> {
        await knex(TablesNames.ACCOUNTS)
            .where({ id })
            .update({ name });
    }

    static async editAmountById(id: number, amount: number): Promise<void> {
        await knex(TablesNames.ACCOUNTS)
            .where({ id })
            .update({ amount });
    }

    static async editDeletionFieldById(id: number, name: string, isDeleted: 0 | 1): Promise<void> {
        await knex(TablesNames.ACCOUNTS)
            .where({ id })
            .update({
                name,
                is_deleted: isDeleted
            });
    }

}
