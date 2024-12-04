import DistributionService from '../../DustributionFinances/DistributionService'

import { convertAmountToNumber } from '../../lib/utils'
import { DistributionType } from '../../DustributionFinances/DustributionModel'
import { TransactionTypes } from '../../constants'

class DeletingTransaction {

    private transactionData: DeleteTransactionDTO;
    private sourceOfTransaction: DistributionType;
    private transactionAddress: DistributionType;

    private fictitiousData: {
        sourceOfTransaction: DistributionType,
        transactionAddress: DistributionType
    }

    constructor(
        transaction: DeleteTransactionDTO,
        sourceOfTransaction: DistributionType,
        transactionAddress: DistributionType
    ) {
        this.transactionData = transaction;
        this.sourceOfTransaction = sourceOfTransaction;
        this.transactionAddress = transactionAddress;

        this.fictitiousData = {
            sourceOfTransaction: this.sourceOfTransaction,
            transactionAddress: this.transactionAddress
        }
    }

    check(): void {

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_INCOME) {
            this.fictitiousData.transactionAddress.amount -= convertAmountToNumber(this.transactionData.amount);
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER) {
            this.fictitiousData.sourceOfTransaction.amount += convertAmountToNumber(this.transactionData.amount);
            this.fictitiousData.transactionAddress.amount -= convertAmountToNumber(this.transactionData.amount);
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            this.fictitiousData.sourceOfTransaction.amount += convertAmountToNumber(this.transactionData.amount);
        }

        if (this.fictitiousData.transactionAddress.amount < 0) {
            throw new Error("Удаление транзакции невозможно: недостаточно средств");
        }

    }

    async realize(): Promise<void> {

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_INCOME) {
            await DistributionService.subtractAmountFromDistribution(this.transactionAddress.id, convertAmountToNumber(this.transactionData.amount));
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER) {
            await DistributionService.addAmountToDistribution(this.sourceOfTransaction.id, convertAmountToNumber(this.transactionData.amount));
            await DistributionService.subtractAmountFromDistribution(this.transactionAddress.id, convertAmountToNumber(this.transactionData.amount));
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            await DistributionService.addAmountToDistribution(this.sourceOfTransaction.id, convertAmountToNumber(this.transactionData.amount));
        }

    }

}

export default DeletingTransaction;
