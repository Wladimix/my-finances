export const VALUE_MISSING = "-";
export const NOT_DEFINE = "———";

export enum TablesNames {
    DISTRIBUTION_OF_FINANCES_TABLE_NAME = "distribution_of_finances",
    SPENDING_CATEGORIES_TABLE_NAME = "spending_categories",
    FINANCIAL_TRANSACTIONS_TABLE_NAME = "financial_transactions",
    NOTES_TABLE = "notes"
}

export enum RequestStatuses {
    SUCCESS = "success",
    ERROR = "error"
}

export enum TransactionTypes {
    FINANCIAL_INCOME = "ДОХОД",
    FINANCIAL_TRANSFER = "ПЕРЕВОД",
    FINANCIAL_EXPENCE = "РАСХОД"
}
