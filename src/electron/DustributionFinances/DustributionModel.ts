import knex from "../connectionDB"

import { TablesNames } from "../constants"

class DistributionModel {

    async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME, table => {
                table.increments("id");
                table.string("name", 50).notNullable();
                table.float("amount", 2).notNullable();
                table.boolean("is_deleted").notNullable().defaultTo(false);

                table.unique("name");
            });
    }

    async getAll(): Promise<AllDistributionTypes> {
        return await knex
            .select("id", "name", "amount")
            .from(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME)
            .whereNot({ id: 1, is_deleted: true })
            .orderBy("name", "asc");
    }

    async getSumDistributiontypes(): Promise<number> {
        return (await knex
            .select()
            .sum({ capital: "amount" })
            .from(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME))[0].capital;
    }

    async getOne(id: number): Promise<DistributionType> {
        return await knex
            .select("id", "name", "amount")
            .from(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME)
            .first()
            .where({ id });
    }

    async add(name: string, amount: number): Promise<number> {
        return (await knex(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME)
            .insert({ name, amount })
        )[0];
    }

    async edit( id: number, name: string, amount: number ): Promise<0 | 1> {
        return await knex(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME)
            .where({ id })
            .update({
                name,
                amount
            });
    }

    async delete(id: number): Promise<0 | 1> {
        return knex(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME)
            .where({ id })
            .update({ is_deleted: true });
    }

}

export default new DistributionModel();

type AllDistributionTypes = {
    id: number
    name: string
    amount: number
}[]

export type DistributionType = {
    id: number
    name: string
    amount: number
}
