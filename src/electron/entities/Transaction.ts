import TransactionModel from '../models/TransactionModel';

export default class Transaction {

    id: number;
    date: string;
    sourceOfTransactionId: number;
    sourceOfTransactionName: string;
    sourceOfTransactionDeleted: 0 | 1;
    transactionAddressId: number;
    transactionAddressName: string;
    transactionAddressDeleted: 0 | 1;
    spendingCategoryId: number;
    spendingCategoryName: string;
    spendingCategoryDeleted: 0 | 1;
    amount: number;
    transactionType: string | null = null;

    constructor (
        id: number | null = null,
        date: string | null = null,
        sourceOfTransactionId: number | null = null,
        sourceOfTransactionName: string | null = null,
        sourceOfTransactionDeleted:  0 | 1 = 0,
        transactionAddressId: number | null = null,
        transactionAddressName: string | null = null,
        transactionAddressDeleted:  0 | 1 = 0,
        spendingCategoryId: number | null = null,
        spendingCategoryName: string | null = null,
        spendingCategoryDeleted: 0 | 1 = 0,
        amount: number | null = null
    ) {
        this.id = id ?? 0;
        this.date = date ?? '';
        this.sourceOfTransactionId = sourceOfTransactionId ?? 0;
        this.sourceOfTransactionName = sourceOfTransactionName ?? '';
        this.sourceOfTransactionDeleted = sourceOfTransactionDeleted;
        this.transactionAddressId = transactionAddressId ?? 0;
        this.transactionAddressName = transactionAddressName ?? '';
        this.transactionAddressDeleted = transactionAddressDeleted ?? 0;
        this.spendingCategoryId = spendingCategoryId ?? 0;
        this.spendingCategoryName = spendingCategoryName ?? '';
        this.spendingCategoryDeleted = spendingCategoryDeleted;
        this.amount = amount ?? 0.00;
    }

    async getAll(filter: IFilter): Promise<ITransaction[]> {
        const page = filter.page !== undefined ? filter.page : 0;
        return await TransactionModel.getAll(filter.year, filter.month, page);
    }

    async getYears(): Promise<number[]> {
        const allDates = await TransactionModel.getAllDates();
        const years: number[] = [];

        allDates.forEach((elem: { date: number }) => {

            const year = new Date(elem.date).getFullYear();

            if (!years.includes(year)) {
                years.push(year);
            }

        });

        return years;
    }

    async getCount(filter: IFilter): Promise<number> {
        return await TransactionModel.getCount(filter.year, filter.month) as number;
    }

    async add(date: Date): Promise<void> {
        await TransactionModel.add(date);
    }

    async editDate(date: Date): Promise<void> {
        if (this.id) {
            await TransactionModel.editDateById(this.id, date);
        }
    }

    async editSourceOfTransactionId(sourceOfTransactionId: number | null): Promise<void> {
        if (this.id) {
            await TransactionModel.editSourceOfTransactionIdById(this.id, sourceOfTransactionId);
        }
    }

    async editTransactionAddressId(transactionAddressId: number | null): Promise<void> {
        if (this.id) {

            if (transactionAddressId !== null) {
                await this.editSpendingCategoryId(null);
            }

            await TransactionModel.editTransactionAddressIdById(this.id, transactionAddressId);

        }
    }

    async editSpendingCategoryId(spendingCategoryId: number | null): Promise<void> {
        if (this.id) {

            if (spendingCategoryId !== null) {
                await this.editTransactionAddressId(null);
            }

            await TransactionModel.editSpendingCategoryIdById(this.id, spendingCategoryId);

        }
    }

    async editAmount(amount: number): Promise<void> {
        if (this.id) {
            await TransactionModel.editAmountById(this.id, amount);
        }
    }

    async delete(): Promise<void> {
        if (this.id) {
            await TransactionModel.deleteById(this.id);
        }
    }

}
