import Account from './Account';
import TransactionModel from '../models/TransactionModel';
import Note from './Note';

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
    note: string;
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
        note: string | null = null,
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
        this.note = note ?? '';
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

            const transaction = await TransactionModel.getOneById(this.id);

            if (transaction !== undefined) {

                this.date = transaction.date;
                this.sourceOfTransactionId = transaction.sourceOfTransactionId;
                this.transactionAddressId = transaction.transactionAddressId;
                this.spendingCategoryId = transaction.spendingCategoryId;
                this.amount = transaction.amount;
                this.transactionType = transaction.transactionType;

                const oldAccount = new Account(this.sourceOfTransactionId);
                const newAccount = new Account(sourceOfTransactionId);
                oldAccount.addAmount(this.amount);
                newAccount.subtractAmount(this.amount);

            }

            await TransactionModel.editSourceOfTransactionIdById(this.id, sourceOfTransactionId);

        }
    }

    async editTransactionAddressId(transactionAddressId: number | null): Promise<void> {
        if (this.id) {

            const transaction = await TransactionModel.getOneById(this.id);

            if (transaction !== undefined) {

                this.date = transaction.date;
                this.sourceOfTransactionId = transaction.sourceOfTransactionId;
                this.transactionAddressId = transaction.transactionAddressId;
                this.spendingCategoryId = transaction.spendingCategoryId;
                this.amount = transaction.amount;
                this.transactionType = transaction.transactionType;

                const oldAccount = new Account(this.transactionAddressId);
                const newAccount = new Account(transactionAddressId);
                oldAccount.subtractAmount(this.amount);
                newAccount.addAmount(this.amount);

            }

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

    async editNote(noteName: string | null): Promise<void> {
        if (this.id) {

            const transaction = await TransactionModel.getOneById(this.id);
            const oldNote = transaction?.note;

            if (noteName === null) {
                await TransactionModel.editNoteIdById(this.id, noteName);
            } else {

                let noteId: number;

                const note = new Note(null, noteName);
                await note.getOne();

                if (note.id) {
                    noteId = note.id;
                } else {
                    await note.add(noteName);
                    noteId = note.id;
                }

                await TransactionModel.editNoteIdById(this.id, noteId);

            }

            if (oldNote !== undefined) {
                await new Note(null, oldNote).deleteExtraNote(oldNote);
            }

        }
    }

    async editAmount(amount: number): Promise<void> {
        if (this.id) {

            const transaction = await TransactionModel.getOneById(this.id);

            if (transaction !== undefined) {

                this.date = transaction.date;
                this.sourceOfTransactionId = transaction.sourceOfTransactionId;
                this.transactionAddressId = transaction.transactionAddressId;
                this.spendingCategoryId = transaction.spendingCategoryId;
                this.amount = transaction.amount;
                this.transactionType = transaction.transactionType;

                if (this.sourceOfTransactionId !== null) {
                    const account = new Account(this.sourceOfTransactionId);
                    await account.addAmount(this.amount);
                    await account.subtractAmount(amount);
                }

                if (this.transactionAddressId !== null) {
                    const account = new Account(this.transactionAddressId);
                    await account.subtractAmount(this.amount);
                    await account.addAmount(amount);
                }

                this.amount = amount;

            }

            await TransactionModel.editAmountById(this.id, amount);

        }
    }

    async delete(): Promise<void> {
        if (this.id) {
            await TransactionModel.deleteById(this.id);
        }
    }

}
