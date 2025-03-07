import knex from './connectionDB';

import { TablesNames, TransactionTypes } from './constants';

export default async function seed() {
    await knex(TablesNames.NOTES).del();

    await knex(TablesNames.ACCOUNTS).del();
    await knex(TablesNames.ACCOUNTS).insert([
        { name: 'Дебетовая карта', amount: 10000, id: 1 }
    ]);
    await knex(TablesNames.CATEGORIES).del();
    await knex(TablesNames.CATEGORIES).insert([
        { name: 'Продукты', id: 1 },
        { name: 'Одежда', id: 2 },
        { name: 'Налоги', id: 3 },
        { name: 'Коммунальные платежи', id: 4 },
        { name: 'Бытовая техника', id: 5 },
        { name: 'Отпуск', id: 6 }
    ]);
    await knex(TablesNames.TRANSACTIONS).del();
    await knex(TablesNames.TRANSACTIONS).insert([
        ...makeTransactions(new Date().getFullYear() - 2),
        ...makeTransactions(new Date().getFullYear() - 1),
        ...makeTransactions(new Date().getFullYear())
    ]);
}
function makeTransactions(year: number): Object[] {
    let transactions: Object[] = [];
    for (let i = 0; i <= 11; i++) {
        transactions.push({
            date: new Date(year, i, Math.floor(Math.random() * (15 - 1 + 1) + 1)),
            source_of_transaction_id: null,
            transaction_address_id: 1,
            spending_category_id: null,
            note_id: null,
            amount: Math.floor(Math.random() * (50000 - 30000 + 1) + 30000),
            transaction_type: TransactionTypes.INCOME
        });
        for (let j = 1; j <= 5; j++) {
            transactions.push({
                date: new Date(year, i, Math.floor(Math.random() * (28 - 1 + 1) + 1)),
                source_of_transaction_id: 1,
                transaction_address_id: null,
                spending_category_id: Math.floor(Math.random() * (6 - 1 + 1) + 1),
                note_id: null,
                amount: Math.floor(Math.random() * (6000 - 3000 + 1) + 3000),
                transaction_type: TransactionTypes.EXPENDITURE
            });
        };
    }
    return transactions;
}
