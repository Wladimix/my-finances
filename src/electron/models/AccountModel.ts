import knex from '../connectionDB';

import { NEW_ACCOUNT, TablesNames } from '../constants';

class AccountModel {

    async createTable(): Promise<void> {
        await knex.schema
            .createTable(TablesNames.ACCOUNT, table => {
                table.increments('id');
                table.string('name', 50).notNullable().defaultTo(NEW_ACCOUNT);
                table.float('amount', 2).notNullable().defaultTo(0.00);
                table.boolean('is_deleted').notNullable().defaultTo(false);
                table.unique('name');
            });
    }

    async getOneByName(name: string): Promise<IAccount | undefined> {
        return await knex(TablesNames.ACCOUNT)
            .where({ name })
            .first();
    }

    async add(): Promise<void> {
        await knex(TablesNames.ACCOUNT).insert({});
    }

}

export default new AccountModel();
