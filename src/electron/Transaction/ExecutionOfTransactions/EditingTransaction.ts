import DistributionService from "../../DustributionFinances/DistributionService"

import { convertAmountToNumber } from "../../lib/utils"
import { DistributionType } from "../../DustributionFinances/DustributionModel"
import { Transaction } from "../TransactionModel"
import { TransactionTypes } from "../../constants"

class EditingTransaction {

    private transactionData: EditTransactionDTO;
    private oldTransactionData: Transaction;

    private sourceOfTransaction: DistributionType;
    private transactionAddress: DistributionType;

    private oldSourceOfTransaction: DistributionType;
    private oldTransactionAddress: DistributionType;

    private fictitiousData: {}

    constructor(
        transaction: EditTransactionDTO,
        oldtransaction: Transaction,

        sourceOfTransaction: DistributionType,
        transactionAddress: DistributionType,

        oldSourceOfTransaction: DistributionType,
        oldTransactionAddress: DistributionType
    ) {
        this.transactionData = transaction;
        this.oldTransactionData = oldtransaction;

        this.sourceOfTransaction = sourceOfTransaction;
        this.transactionAddress = transactionAddress;

        this.oldSourceOfTransaction = oldSourceOfTransaction;
        this.oldTransactionAddress = oldTransactionAddress;

        this.fictitiousData = {}

        this.fictitiousData[this.sourceOfTransaction.id] = Object.assign({}, this.sourceOfTransaction);
        this.fictitiousData[this.transactionAddress.id] = Object.assign({}, this.transactionAddress);
        this.fictitiousData[this.oldSourceOfTransaction.id] = Object.assign({}, this.oldSourceOfTransaction);
        this.fictitiousData[this.oldTransactionAddress.id] = Object.assign({}, this.oldTransactionAddress);
    }

    check(): void {

        if (this.oldTransactionData.transactionType === TransactionTypes.FINANCIAL_INCOME) {
            this.fictitiousData[this.oldTransactionAddress.id].amount -= this.oldTransactionData.amount;
        }

        if (this.oldTransactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER) {
            this.fictitiousData[this.oldSourceOfTransaction.id].amount += this.oldTransactionData.amount;
            this.fictitiousData[this.oldTransactionAddress.id].amount -= this.oldTransactionData.amount;
        }

        if (this.oldTransactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            this.fictitiousData[this.oldSourceOfTransaction.id].amount += this.oldTransactionData.amount;
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_INCOME) {
            this.fictitiousData[this.transactionAddress.id].amount += convertAmountToNumber(this.transactionData.amount);
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER) {
            this.fictitiousData[this.sourceOfTransaction.id].amount -= convertAmountToNumber(this.transactionData.amount);
            this.fictitiousData[this.transactionAddress.id].amount += convertAmountToNumber(this.transactionData.amount);
        }

        if (this.transactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            this.fictitiousData[this.sourceOfTransaction.id].amount -= convertAmountToNumber(this.transactionData.amount);
        }

        for (let distributionType in this.fictitiousData) {
            if (this.fictitiousData[distributionType].amount < 0) {
                throw new Error("Редактирование транзакции невозможно: недостаточно средств");
            }
        }

    }

    async realize(): Promise<void> {

        if (this.oldTransactionData.transactionType === TransactionTypes.FINANCIAL_INCOME) {
            await DistributionService.subtractAmountFromDistribution(this.oldTransactionAddress.id, this.oldTransactionData.amount);
        }

        if (this.oldTransactionData.transactionType === TransactionTypes.FINANCIAL_TRANSFER) {
            await DistributionService.addAmountToDistribution(this.oldSourceOfTransaction.id, this.oldTransactionData.amount);
            await DistributionService.subtractAmountFromDistribution(this.oldTransactionAddress.id, this.oldTransactionData.amount);
        }

        if (this.oldTransactionData.transactionType === TransactionTypes.FINANCIAL_EXPENCE) {
            await DistributionService.addAmountToDistribution(this.oldSourceOfTransaction.id, this.oldTransactionData.amount);
        }

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

export default EditingTransaction;
