import knex from '../connectionDB';

import { TablesNames } from '../constants';

class TransactionModel {

    async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.TRANSACTIONS, table => {
                table.increments('id');
                table.date('date').notNullable();
                table.integer('source_of_transaction_id').references('id').inTable(TablesNames.ACCOUNTS);
                table.integer('transaction_address_id').references('id').inTable(TablesNames.ACCOUNTS);
                table.integer('spending_category_id').references('id').inTable(TablesNames.CATEGORIES);
                // table.integer('note_id').references('id').inTable(TablesNames.NOTES).notNullable();
                table.float('amount', 2).notNullable().defaultTo(0.00);
                table.string('transaction_type');
                // table.boolean('to_calculate_inflation').notNullable().defaultTo(0);
            });
    }

    async getAll(): Promise<ITransaction[]> {
        return await knex
            .select(
                `${TablesNames.TRANSACTIONS}.id`,
                `${TablesNames.TRANSACTIONS}.date`,
                'sources_of_transactions.id as sourceOfTransactionId',
                'sources_of_transactions.name as sourceOfTransactionName',
                'sources_of_transactions.is_deleted as sourceOfTransactionDeleted',
                'transactions_addresses.id as transactionAddressId',
                'transactions_addresses.name as transactionAddressName',
                `${TablesNames.CATEGORIES}.id as spendingCategoryId`,
                `${TablesNames.CATEGORIES}.name as spendingCategoryName`,
                `${TablesNames.CATEGORIES}.is_deleted as spendingCategoryDeleted`,
                // `${TablesNames.NOTES_TABLE}.name as note`,
                `${TablesNames.TRANSACTIONS}.amount`,
                `${TablesNames.TRANSACTIONS}.transaction_type as transactionType`,
                // `${TablesNames.TRANSACTIONS}.to_calculate_inflation as toCalculateInflation`
            )
            .from(TablesNames.TRANSACTIONS)
            // .offset(page * 30).limit(30)

            .leftJoin(`${TablesNames.ACCOUNTS} as sources_of_transactions`, `${TablesNames.TRANSACTIONS}.source_of_transaction_id`, '=', 'sources_of_transactions.id')
            .leftJoin(`${TablesNames.ACCOUNTS} as transactions_addresses`, `${TablesNames.TRANSACTIONS}.transaction_address_id`, '=', 'transactions_addresses.id')
            .leftJoin(TablesNames.CATEGORIES, `${TablesNames.TRANSACTIONS}.spending_category_id`, '=', `${TablesNames.CATEGORIES}.id`)
            // .join(TablesNames.NOTES_TABLE, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.note_id`, '=', `${TablesNames.NOTES_TABLE}.id`)

            // .whereLike(`${TablesNames.NOTES_TABLE}.name`, `%${note}%`)
            .orderBy(`${TablesNames.TRANSACTIONS}.date`, 'desc')
            .orderBy(`${TablesNames.TRANSACTIONS}.id`, 'desc');
    }

    async add(date: Date): Promise<void> {
        await knex(TablesNames.TRANSACTIONS).insert({ date });
    }

    async editDateById(id: number, date: Date): Promise<void> {
        await knex(TablesNames.TRANSACTIONS)
            .where({ id })
            .update({ date });
    }

}

export default new TransactionModel();
