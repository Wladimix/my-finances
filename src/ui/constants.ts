export const DELETED_PARAMS_REGULAR = /\(удалено.+\)/;
export const VALUE_MISSING = "-";
export const NOT_DEFINE = "———";

export enum TransactionEvent {
    ADD, EDIT
}

export enum ModifierId {
    DISTRIBUTION_ID = "distribution-",
    SPENDING_CATEGORY_ID = "spending-category-"
}

export enum TransactionsTypes {
    FINANCIAL_INCOME = "ДОХОД",
    FINANCIAL_TRANSFER = "ПЕРЕВОД",
    FINANCIAL_EXPENCE = "РАСХОД",
    PRICE_MONITORING = "МОНИТОРИНГ ЦЕНЫ"
}
