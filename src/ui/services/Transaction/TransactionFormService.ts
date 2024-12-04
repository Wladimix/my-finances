import { ModifierId, VALUE_MISSING } from "../../constants"

export default class TransactionFormService {

    private transaction: AddTransactionDTO;

    constructor(transaction: AddTransactionDTO) {
        this.transaction = transaction;
    }

    showAddressOrCategory(): string {
        return this.identifyAddressOrCategoryToShow();
    }

    showNote(): string {
        return this.transaction.note === VALUE_MISSING ? "" : this.transaction.note || ""
    }

    private identifyAddressOrCategoryToShow(): string {
        const transactionAddressId = this.transaction.transactionAddressId !== 1
            ? ModifierId.DISTRIBUTION_ID + this.transaction.transactionAddressId
            : this.transaction.transactionAddressId;

        const spendingCategoryId = this.transaction.spendingCategoryId !== 1
            ? ModifierId.SPENDING_CATEGORY_ID + this.transaction.spendingCategoryId
            : this.transaction.spendingCategoryId;

        return transactionAddressId !== 1 ? String(transactionAddressId) : String(spendingCategoryId);
    }

    identifyAndGetAddressOrCategoryToSend(valueToSend: string) {
        const transactionAddressId = valueToSend.includes(ModifierId.DISTRIBUTION_ID) ? this.clearId(valueToSend) : 1;
        const spendingCategoryId = valueToSend.includes(ModifierId.SPENDING_CATEGORY_ID) ? this.clearId(valueToSend) : 1;
        return { transactionAddressId, spendingCategoryId };
    }

    private clearId(id: string): number {
        return +id.replace(/^\D+/g, "");
    }

}
