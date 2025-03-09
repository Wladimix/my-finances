import knex from '../connectionDB';

import { TablesNames } from '../constants';

export default class NoteModel {

    static async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.NOTES, table => {
                table.increments('id');
                table.string('name').notNullable();
                table.unique('name');
            });
    }

    static async findMatches(name: string): Promise<INote[]> {
        return await knex
            .select()
            .from(TablesNames.NOTES)
            .whereLike('name', `%${name}%`)
            .orderBy('name', 'asc');
    }

    static async getOneByName(name: string): Promise<INote | undefined> {
        return await knex
            .select('*')
            .from(TablesNames.NOTES)
            .where({ name })
            .first();
    }

    static async deleteById(id: number): Promise<void> {
        await knex(TablesNames.NOTES)
            .where({ id })
            .del();
    }

}
