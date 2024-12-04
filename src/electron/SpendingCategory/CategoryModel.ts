import knex from "../connectionDB"

import { TablesNames } from "../constants"

class CategoryModel {

    async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.SPENDING_CATEGORIES_TABLE_NAME, table => {
                table.increments("id");
                table.string("name", 50).notNullable();
                table.boolean("is_deleted").notNullable().defaultTo(false);

                table.unique("name");
            });
    }

    async getAll(): Promise<AllSpendingCategoriesType>  {
        return await knex
            .select("id", "name")
            .from(TablesNames.SPENDING_CATEGORIES_TABLE_NAME)
            .whereNot({ id: 1, is_deleted: true })
            .orderBy("name", "asc");
    }

    async add(name: string): Promise<number> {
        return (await knex(TablesNames.SPENDING_CATEGORIES_TABLE_NAME)
            .insert({ name })
        )[0];
    }

    async edit(id: number, name: string): Promise<0 | 1> {
        return await knex(TablesNames.SPENDING_CATEGORIES_TABLE_NAME)
            .where({ id })
            .update({ name });
    }

    async delete(id: number): Promise<0 | 1> {
        return await knex(TablesNames.SPENDING_CATEGORIES_TABLE_NAME)
            .where({ id })
            .update({ is_deleted: true });
    }

}

export default new CategoryModel();

type AllSpendingCategoriesType = {
    id: number
    name: string
}[]
