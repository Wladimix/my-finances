import knex from "../connectionDB"

import { VALUE_MISSING, TablesNames } from "../constants"

class NoteModel {

    async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.NOTES_TABLE, table => {
                table.increments("id");
                table.string("name", 70).notNullable();

                table.unique("name");
            });
    }

    async findMatches(name: string) {
        return await knex
            .select()
            .from(TablesNames.NOTES_TABLE)
            .whereNot({ id: 1 })
            .whereLike("name", `%${name}%`)
            .orderBy("name", "asc");
    }

    async getOne(name: string): Promise<Note | undefined> {
        return await knex
            .select()
            .from(TablesNames.NOTES_TABLE)
            .first()
            .where({ name })
    }

    async add(name: string): Promise<number> {
        return (await knex(TablesNames.NOTES_TABLE)
            .insert({name })
        )[0];
    }

    async delete(id: number, name: string): Promise<0 | 1> {
        if (name !== VALUE_MISSING) {
            return await knex(TablesNames.NOTES_TABLE)
                .where({ id })
                .del();
        };

        return 0;
    }

}

export default new NoteModel();

export type Note = {
    id: number
    name: string
}
