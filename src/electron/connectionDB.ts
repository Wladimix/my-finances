import knex from "knex"
import path from "path"

import { app } from "electron"

export const DATABASE_PATH = path.join(app.getPath("home"), "my_finances_data");
export const DATABASE_NAME = "my_finances_db.sqlite3";

const database = knex({
    client: "sqlite3",
    connection: {
        filename: path.join(DATABASE_PATH, DATABASE_NAME)
    },
    useNullAsDefault: true
});

export default database;
export const getTablesNames = async (): Promise<string[]> =>
    (await database("sqlite_master").where("type", "table")).map(table => table.name);
