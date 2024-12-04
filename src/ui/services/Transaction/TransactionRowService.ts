import { makeDate } from "../../lib/utils"
import { DELETED_PARAMS_REGULAR, NOT_DEFINE, TransactionsTypes } from "../../constants"

export default class TransactionRowService {

    private transaction: GetTransactionDTO;

    constructor(transaction: GetTransactionDTO) {
        this.transaction = transaction;
    }

    makeTransactionParamsToShow() {
        const date = makeDate(this.transaction.date);
        const sourceOfTransaction = this.transaction.sourceOfTransactionId !== 1 ? this.transaction.sourceOfTransactionName : "-";
        const addressOrCategory = this.identifyAddressOrCategoryToShow();
        const note = this.transaction.note;
        const amount = this.transaction.amount;

        const amountClasses = {
            [String(TransactionsTypes.FINANCIAL_INCOME)]: "uk-text-large uk-text-bold uk-text-success",
            [String(TransactionsTypes.FINANCIAL_TRANSFER)]: "uk-text-large uk-text-bold uk-text-warning",
            [String(TransactionsTypes.FINANCIAL_EXPENCE)]: "uk-text-large uk-text-bold uk-text-danger",
            [String(TransactionsTypes.PRICE_MONITORING)]: "uk-text-large uk-text-bold",
            [NOT_DEFINE]: "uk-text-large uk-text-bold",
        }

        const sourceOfTransactionClass = DELETED_PARAMS_REGULAR.test(sourceOfTransaction) ? "uk-text-danger" : "";
        const addressOrCategoryClass = DELETED_PARAMS_REGULAR.test(addressOrCategory) ? "uk-text-danger" : "";
        const amountClass = amountClasses[this.transaction.transactionType];

        const thereDeletedParameters = DELETED_PARAMS_REGULAR.test(sourceOfTransaction) || DELETED_PARAMS_REGULAR.test(addressOrCategory) ? true : false;

        return {
            data: {
                date,
                sourceOfTransaction: sourceOfTransaction.replace(DELETED_PARAMS_REGULAR, ""),
                addressOrCategory: addressOrCategory.replace(DELETED_PARAMS_REGULAR, ""),
                note,
                amount
            },
            classes: {
                sourceOfTransaction: sourceOfTransactionClass,
                addressOrCategory: addressOrCategoryClass,
                amount: amountClass
            },
            thereDeletedParameters
        }
    }

    private identifyAddressOrCategoryToShow(): string {
        if (this.transaction.transactionAddressId !== 1 && this.transaction.spendingCategoryId === 1) {
            return this.transaction.transactionAddressName;
        }

        if (this.transaction.transactionAddressId === 1 && this.transaction.spendingCategoryId !== 1) {
            return this.transaction.spendingCategoryName;
        }

        return "-";
    }

}
