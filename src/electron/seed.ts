import knex from "./connectionDB"

import { TablesNames, TransactionTypes } from "./constants"

export default async function seed() {

    await knex(TablesNames.NOTES_TABLE).del();
    await knex(TablesNames.NOTES_TABLE).insert([
        { name: "-", id: 1 }
    ]);

    await knex(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME).del();
    await knex(TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME).insert([
        { name: "тип не выбран",   amount: 0,     id: 1 },
        { name: "Дебетовая карта", amount: 10000, id: 2 }
    ]);

    await knex(TablesNames.SPENDING_CATEGORIES_TABLE_NAME).del();
    await knex(TablesNames.SPENDING_CATEGORIES_TABLE_NAME).insert([
        { name: "категория не выбрана", id: 1 },
        { name: "Продукты",             id: 2 },
        { name: "Одежда",               id: 3 },
        { name: "Налоги",               id: 4 },
        { name: "Коммунальные платежи", id: 5 },
        { name: "Бытовая техника",      id: 6 },
        { name: "Отпуск",               id: 7 }
    ]);

    await knex(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME).del();
    await knex(TablesNames.FINANCIAL_TRANSACTIONS_TABLE_NAME).insert([
        ...makeTransactions(2022),
        ...makeTransactions(2023),
        ...makeTransactions(2024)
    ]);

}

function makeTransactions(year: number): Object[] {
    let transactions: Object[] = [];

    for (let i = 0; i <= 11; i++) {
        transactions.push({
            date: new Date(year, i, Math.floor(Math.random() * (15 - 1 + 1) + 1)),
            source_of_transaction_id: 1,
            transaction_address_id: 2,
            spending_category_id: 1,
            note_id: 1,
            amount:  Math.floor(Math.random() * (50000 - 30000 + 1) + 30000),
            transaction_type: TransactionTypes.FINANCIAL_INCOME
        });

        for (let j = 1; j <= 5; j++) {
            transactions.push({
                date: new Date(year, i, Math.floor(Math.random() * (28 - 1 + 1) + 1)),
                source_of_transaction_id: 2,
                transaction_address_id: 1,
                spending_category_id: Math.floor(Math.random() * (7 - 2 + 1) + 2),
                note_id: 1,
                amount: Math.floor(Math.random() * (6000 - 3000 + 1) + 3000),
                transaction_type: TransactionTypes.FINANCIAL_EXPENCE
            });
        };
    }

    return transactions;
}
