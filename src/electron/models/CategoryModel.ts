import knex from '../connectionDB';

import { NewEntities, TablesNames } from '../constants';

class CategoryModel {

    async createTable(): Promise<void> {
        await knex.schema
            .createTable(TablesNames.CATEGORIES, table => {
                table.increments('id');
                table.string('name').notNullable().defaultTo(NewEntities.NEW_CATEGORY);;
                table.boolean('is_deleted').notNullable().defaultTo(false);
                table.unique('name');
            });
    }

    async getAll(): Promise<ICategory[]> {
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

    async getOneById(id: number): Promise<ICategory | undefined> {
        return await knex(TablesNames.CATEGORIES)
            .where({ id })
            .whereNot({ is_deleted: true })
            .first();
    }

    async getOneByName(name: string): Promise<ICategory | undefined> {
        return await knex(TablesNames.CATEGORIES)
            .where({ name })
            .whereNot({ is_deleted: true })
            .first();
    }

    async add(): Promise<void> {
        await knex(TablesNames.CATEGORIES).insert({});
    }

    async editNameById(id: number, name: string): Promise<void> {
        await knex(TablesNames.CATEGORIES)
            .where({ id })
            .update({ name });
    }

    async editDeletionFieldById(id: number, name: string, isDeleted: 0 | 1): Promise<void> {
        await knex(TablesNames.CATEGORIES)
            .where({ id })
            .update({
                name,
                is_deleted: isDeleted
            });
    }

}

export default new CategoryModel();
