import DistributionService from "../../DustributionFinances/DistributionService"

import { convertAmountToNumber } from "../../lib/utils"
import { DistributionType } from '../../DustributionFinances/DustributionModel'
import { TransactionTypes } from "../../constants"

class AddingTransaction {

    private transactionData: AddTransactionDTO;
    private sourceOfTransaction: DistributionType;
    private transactionAddress: DistributionType;

    private fictitiousData: {
        sourceOfTransaction: DistributionType
    }

    constructor(
        transaction: AddTransactionDTO,
        sourceOfTransaction: DistributionType,
        transactionAddress: DistributionType
    ) {
        this.transactionData = transaction;
        this.sourceOfTransaction = sourceOfTransaction;
        this.transactionAddress = transactionAddress;

        this.fictitiousData = {
            sourceOfTransaction: this.sourceOfTransaction
        }
    }

    check(): void {

        this.fictitiousData.sourceOfTransaction = Object.assign({}, this.sourceOfTransaction);

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER || this.transactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            this.fictitiousData.sourceOfTransaction.amount -= convertAmountToNumber(this.transactionData.amount);
        }

        if (this.fictitiousData.sourceOfTransaction.amount < 0) {
            throw new Error("Добавление транзакции невозможно: недостаточно средств");
        }

    }

    async realize(): Promise<void> {

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_INCOME) {
            await DistributionService.addAmountToDistribution(this.transactionAddress.id, convertAmountToNumber(this.transactionData.amount));
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER) {
            await DistributionService.subtractAmountFromDistribution(this.sourceOfTransaction.id, convertAmountToNumber(this.transactionData.amount));
            await DistributionService.addAmountToDistribution(this.transactionAddress.id, convertAmountToNumber(this.transactionData.amount));
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            await DistributionService.subtractAmountFromDistribution(this.sourceOfTransaction.id, convertAmountToNumber(this.transactionData.amount));
        }

    }

}

export default AddingTransaction;
