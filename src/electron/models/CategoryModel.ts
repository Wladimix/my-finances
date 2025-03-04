import knex from '../connectionDB';

import { NewEntities, TablesNames } from '../constants';

export default class CategoryModel {

    static async createTable(): Promise<void> {
        await knex.schema
            .createTable(TablesNames.CATEGORIES, table => {
                table.increments('id');
                table.string('name').notNullable().defaultTo(NewEntities.NEW_CATEGORY);;
                table.boolean('is_deleted').notNullable().defaultTo(false);
                table.unique('name');
            });
    }

    static async getAll(): Promise<ICategory[]> {
        return await knex
            .select(
                'id',
                'name',
                'is_deleted as isDeleted'
            )
            .whereNot({ is_deleted: true })
            .from(TablesNames.CATEGORIES)
            .orderBy('name', 'asc');
    }

    static async getOneById(id: number): Promise<ICategory | undefined> {
        return await knex(TablesNames.CATEGORIES)
            .where({ id })
            .whereNot({ is_deleted: true })
            .first();
    }

    static async getOneByName(name: string): Promise<ICategory | undefined> {
        return await knex(TablesNames.CATEGORIES)
            .where({ name })
            .whereNot({ is_deleted: true })
            .first();
    }

    static async add(): Promise<void> {
        await knex(TablesNames.CATEGORIES).insert({});
    }

    static async editNameById(id: number, name: string): Promise<void> {
        await knex(TablesNames.CATEGORIES)
            .where({ id })
            .update({ name });
    }

    static async editDeletionFieldById(id: number, name: string, isDeleted: 0 | 1): Promise<void> {
        await knex(TablesNames.CATEGORIES)
            .where({ id })
            .update({
                name,
                is_deleted: isDeleted
            });
    }

}
