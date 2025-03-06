import knex from '../connectionDB';

import { getLastMonthDay } from '../utils';
import { Knex } from 'knex';
import { TablesNames } from '../constants';

export default class TransactionModel {

    static async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.TRANSACTIONS, table => {
                table.increments('id');
                table.date('date').notNullable();
                table.integer('source_of_transaction_id').references('id').inTable(TablesNames.ACCOUNTS);
                table.integer('transaction_address_id').references('id').inTable(TablesNames.ACCOUNTS);
                table.integer('spending_category_id').references('id').inTable(TablesNames.CATEGORIES);
                table.integer('note_id').references('id').inTable(TablesNames.NOTES);
                table.float('amount', 2).notNullable().defaultTo(0.00);
                table.string('transaction_type');
                // table.boolean('to_calculate_inflation').notNullable().defaultTo(0);
            });
    }

    static async getAll(year: string | null, month: string | null, note: string | null, page: number): Promise<ITransaction[]> {

        const query = knex
            .select(
                `${TablesNames.TRANSACTIONS}.id`,
                `${TablesNames.TRANSACTIONS}.date`,
                'sources_of_transactions.id as sourceOfTransactionId',
                'sources_of_transactions.name as sourceOfTransactionName',
                'sources_of_transactions.is_deleted as sourceOfTransactionDeleted',
                'transactions_addresses.id as transactionAddressId',
                'transactions_addresses.name as transactionAddressName',
                'transactions_addresses.is_deleted as transactionAddressDeleted',
                `${TablesNames.CATEGORIES}.id as spendingCategoryId`,
                `${TablesNames.CATEGORIES}.name as spendingCategoryName`,
                `${TablesNames.CATEGORIES}.is_deleted as spendingCategoryDeleted`,
                `${TablesNames.NOTES}.name as note`,
                `${TablesNames.TRANSACTIONS}.amount`,
                `${TablesNames.TRANSACTIONS}.transaction_type as transactionType`,
                // `${TablesNames.TRANSACTIONS}.to_calculate_inflation as toCalculateInflation`
            )
            .from(TablesNames.TRANSACTIONS)
            .offset(page * 3).limit(3);

        query
            .leftJoin(`${TablesNames.ACCOUNTS} as sources_of_transactions`, `${TablesNames.TRANSACTIONS}.source_of_transaction_id`, '=', 'sources_of_transactions.id')
            .leftJoin(`${TablesNames.ACCOUNTS} as transactions_addresses`, `${TablesNames.TRANSACTIONS}.transaction_address_id`, '=', 'transactions_addresses.id')
            .leftJoin(TablesNames.CATEGORIES, `${TablesNames.TRANSACTIONS}.spending_category_id`, '=', `${TablesNames.CATEGORIES}.id`)
            .leftJoin(TablesNames.NOTES, `${TablesNames.TRANSACTIONS}.note_id`, '=', `${TablesNames.NOTES}.id`)

        if (note !== null) {
            query.whereLike(`${TablesNames.NOTES}.name`, `%${note}%`);
        }

        query
            .whereBetween(`${TablesNames.TRANSACTIONS}.date`, this.makeDateSearchOptions(year, month))
            .orderBy(`${TablesNames.TRANSACTIONS}.date`, 'desc')
            .orderBy(`${TablesNames.TRANSACTIONS}.id`, 'desc');

        return await query;

    }

    static async getAllDates(): Promise<{ date: number }[]> {
        return await knex
            .select('date')
            .from(TablesNames.TRANSACTIONS)
            .orderBy(`${TablesNames.TRANSACTIONS}.date`, 'desc');
    }

    static async getAllNotes(): Promise<INote[]> {
        return await knex
            .select(`${TablesNames.NOTES}.id`, `${TablesNames.NOTES}.name`)
            .from(TablesNames.TRANSACTIONS)
            .join(TablesNames.NOTES, `${TablesNames.TRANSACTIONS}.note_id`, "=", `${TablesNames.NOTES}.id`);
    }

    static async getCount(year: string | null, month: string | null, note: string | null): Promise<string | number> {
        const query = knex(TablesNames.TRANSACTIONS)
            .count(`${TablesNames.TRANSACTIONS}.id as count`)
            .whereBetween(`${TablesNames.TRANSACTIONS}.date`, this.makeDateSearchOptions(year, month))
            .leftJoin(TablesNames.NOTES, `${TablesNames.TRANSACTIONS}.note_id`, '=', `${TablesNames.NOTES}.id`);

        if (note !== null) {
            query.whereLike(`${TablesNames.NOTES}.name`, `%${note}%`);
        }

        return (await query)[0].count;
    }

    static async getOneById(id: number): Promise<ITransaction | undefined> {
        return await knex
            .select(
                `${TablesNames.TRANSACTIONS}.id`,
                `${TablesNames.TRANSACTIONS}.date`,
                'sources_of_transactions.id as sourceOfTransactionId',
                'sources_of_transactions.name as sourceOfTransactionName',
                'sources_of_transactions.is_deleted as sourceOfTransactionDeleted',
                'transactions_addresses.id as transactionAddressId',
                'transactions_addresses.name as transactionAddressName',
                'transactions_addresses.is_deleted as transactionAddressDeleted',
                `${TablesNames.CATEGORIES}.id as spendingCategoryId`,
                `${TablesNames.CATEGORIES}.name as spendingCategoryName`,
                `${TablesNames.CATEGORIES}.is_deleted as spendingCategoryDeleted`,
                `${TablesNames.NOTES}.name as note`,
                `${TablesNames.TRANSACTIONS}.amount`,
                `${TablesNames.TRANSACTIONS}.transaction_type as transactionType`,
                // `${TablesNames.TRANSACTIONS}.to_calculate_inflation as toCalculateInflation`
            )
            .from(TablesNames.TRANSACTIONS)

            .leftJoin(`${TablesNames.ACCOUNTS} as sources_of_transactions`, `${TablesNames.TRANSACTIONS}.source_of_transaction_id`, '=', 'sources_of_transactions.id')
            .leftJoin(`${TablesNames.ACCOUNTS} as transactions_addresses`, `${TablesNames.TRANSACTIONS}.transaction_address_id`, '=', 'transactions_addresses.id')
            .leftJoin(TablesNames.CATEGORIES, `${TablesNames.TRANSACTIONS}.spending_category_id`, '=', `${TablesNames.CATEGORIES}.id`)
            .leftJoin(TablesNames.NOTES, `${TablesNames.TRANSACTIONS}.note_id`, '=', `${TablesNames.NOTES}.id`)

            .where({ [`${TablesNames.TRANSACTIONS}.id`]: id })
            .first();
    }

    static async add(date: Date): Promise<void> {
        await knex(TablesNames.TRANSACTIONS).insert({ date });
    }

    static async editDateById(id: number, date: Date): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ date });
    }

    static async editSourceOfTransactionIdById(id: number, sourceOfTransactionId: number | null): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ source_of_transaction_id: sourceOfTransactionId });
    }

    static async editTransactionAddressIdById(id: number, transactionAddressId: number | null): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ transaction_address_id: transactionAddressId });
    }

    static async editSpendingCategoryIdById(id: number, spendingCategoryId: number | null): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ spending_category_id: spendingCategoryId });
    }

    static async editAmountById(id: number, amount: number): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ amount });
    }

    static async editNoteIdById(id: number, noteId: number | null): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ note_id: noteId });
    }

    static async deleteById(id: number): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .del();
    }

    private static makeDateSearchOptions(year: string | null, month: string | null): [Knex.DbColumn<Date>, Knex.DbColumn<Date>] {
        return [
            new Date(year ? Number(year) : 1970, month ? Number(month) : 0, 1, 0, 0, 0),
            new Date(year ? Number(year) : 2970, month ? Number(month) : 11, getLastMonthDay(year, month), 23, 59, 59)
        ];
    }

}
