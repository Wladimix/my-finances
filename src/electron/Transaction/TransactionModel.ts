import knex from "../connectionDB"

import { Knex } from "knex"
import { makeDateSearchOptions } from "../lib/utils"
import { Note } from "../Note/NoteModel"
import { NOT_DEFINE, TablesNames, TransactionTypes } from "../constants"

class TransactionModel {

    async createTable(): Promise<void> {
        return await knex.schema
            .createTable(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME, table => {
                table.increments("id");
                table.date("date").notNullable();
                table.integer("source_of_transaction_id").references("id").inTable(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME).notNullable();
                table.integer("transaction_address_id").references("id").inTable(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME).notNullable();
                table.integer("spending_category_id").references("id").inTable(TablesNames.SPENDING_CATEGORIES_TABLE_NAME).notNullable();
                table.integer("note_id").references("id").inTable(TablesNames.NOTES_TABLE).notNullable();
                table.integer("amount");
                table.string("transaction_type", 7).notNullable();
                table.boolean("to_calculate_inflation").defaultTo(false).notNullable();
            });
    }

    getAll(note: string, page: number): Knex.QueryBuilder {
        return knex
            .select(
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.id`,
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`,
                "sources_of_financial_distribution.id as sourceOfTransactionId",
                "sources_of_financial_distribution.name as sourceOfTransactionName",
                "sources_of_financial_distribution.is_deleted as sourceOfTransactionDeleted",
                "financial_distribution_addresses.id as transactionAddressId",
                "financial_distribution_addresses.name as transactionAddressName",
                `${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}.id as spendingCategoryId`,
                `${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}.name as spendingCategoryName`,
                `${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}.is_deleted as spendingCategoryDeleted`,
                `${TablesNames.NOTES_TABLE}.name as note`,
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.amount`,
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.transaction_type as transactionType`,
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.to_calculate_inflation as toCalculateInflation`
            )
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .offset(page * 30).limit(30)

            .join(`${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME} as sources_of_financial_distribution`, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.source_of_transaction_id`, "=", "sources_of_financial_distribution.id")
            .join(`${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME} as financial_distribution_addresses`, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.transaction_address_id`, "=", "financial_distribution_addresses.id")
            .join(TablesNames.SPENDING_CATEGORIES_TABLE_NAME, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.spending_category_id`, "=", `${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}.id`)
            .join(TablesNames.NOTES_TABLE, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.note_id`, "=", `${TablesNames.NOTES_TABLE}.id`)

            .whereLike(`${TablesNames.NOTES_TABLE}.name`, `%${note}%`)
            .orderBy(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, "desc")
            .orderBy(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.id`, "desc");
    }

    getCount(note: string): Knex.QueryBuilder {
        return knex(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .count(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.id as count`)
            .join(TablesNames.NOTES_TABLE, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.note_id`, "=", `${TablesNames.NOTES_TABLE}.id`)
            .whereLike(`${TablesNames.NOTES_TABLE}.name`, `%${note}%`);
    }

    async getOne(id: number): Promise<Transaction> {
        return await knex
            .select(
                "id",
                "date",
                "source_of_transaction_id as sourceOfTransactionId",
                "transaction_address_id as transactionAddressId",
                "spending_category_id as spendingCategoryId",
                "note_id as noteId",
                "amount",
                "transaction_type as transactionType",
            )
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .first()
            .where({ id });
    }

    async getAllDates(): Promise<Dates> {
        return await knex
            .select("date")
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .orderBy(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, "asc");
    }

    async getNotes(transactionId: number | null = null): Promise<Note[]> {
        const transactionIdColumn = `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.id`;
        const queryWhere = transactionId ? { [transactionIdColumn]: transactionId } : {};

        return await knex
            .select(`${TablesNames.NOTES_TABLE}.id`, `${TablesNames.NOTES_TABLE}.name`)
            .distinct(`${TablesNames.NOTES_TABLE}.name`)
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .join(TablesNames.NOTES_TABLE, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.note_id`, "=", `${TablesNames.NOTES_TABLE}.id`)
            .where(queryWhere);
    }

    getAmountOfExpensesByCategory(): Knex.QueryBuilder {
        return knex
            .select(`${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}.name as purchase`)
            .sum({ amount: "amount" })
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .join(TablesNames.SPENDING_CATEGORIES_TABLE_NAME, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.spending_category_id`, "=", `${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}.id`)
            .where({ transaction_type: TransactionTypes.FINANCIAL_EXPENCE })
            .groupBy("purchase");
    }

    getTotalAmount(transactionType: TransactionTypes): Knex.QueryBuilder {
        return knex
            .select("amount")
            .sum({ amount: "amount" })
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .where({ transaction_type: transactionType });
    }

    async getRecordsForInflation(year: number): Promise<RecordForInflation[]> {
        return await knex
            .select(
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.id`,
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`,
                `${TablesNames.NOTES_TABLE}.name as note`,
                `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.amount`
            )
            .from(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .join(TablesNames.NOTES_TABLE, `${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.note_id`, "=", `${TablesNames.NOTES_TABLE}.id`)
            .where({ to_calculate_inflation: true })
            .andWhereBetween(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, makeDateSearchOptions(String(year), NOT_DEFINE))
            .orderBy(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.date`, "asc")
            .orderBy(`${TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME}.id`, "asc");
    }

    async add(transaction: AddedTransaction): Promise<number> {
        return await knex(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .insert({
                date: transaction.date,
                source_of_transaction_id: transaction.sourceOfTransactionId,
                transaction_address_id: transaction.transactionAddressId,
                spending_category_id: transaction.spendingCategoryId,
                note_id: transaction.noteId,
                amount: transaction.amount,
                transaction_type: transaction.transactionType,
                to_calculate_inflation: transaction.toCalculateInflation
            });
    }

    async edit(transaction: EditableTransaction): Promise<0 | 1> {
        return await knex(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .where({ id: transaction.id })
            .update({
                date: transaction.date,
                source_of_transaction_id: transaction.sourceOfTransactionId,
                transaction_address_id: transaction.transactionAddressId,
                spending_category_id: transaction.spendingCategoryId,
                note_id: transaction.noteId,
                amount: transaction.amount,
                transaction_type: transaction.transactionType,
                to_calculate_inflation: transaction.toCalculateInflation
            });
    }

    delete(id: number): Promise<0 | 1> {
        return knex(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME)
            .where({ id })
            .del();
    }

}

export default new TransactionModel();

export type Transaction = {
    id: number,
    date: number,
    sourceOfTransactionId: number,
    transactionAddressId: number,
    spendingCategoryId: number,
    noteId: number,
    amount: number,
    transactionType: string
}

type AddedTransaction = {
    date: Date
    sourceOfTransactionId: number
    transactionAddressId: number
    spendingCategoryId: number
    noteId: number
    amount: number
    transactionType: string,
    toCalculateInflation: boolean
}

type EditableTransaction = {
    id: number
    date: Date
    sourceOfTransactionId: number
    transactionAddressId: number
    spendingCategoryId: number
    noteId: number
    amount: number
    transactionType: string,
    toCalculateInflation: boolean
}

type Dates = {
    date: number
}[]

export type RecordForInflation = {
    id: number
    date: Date,
    note: string,
    amount: number
}
