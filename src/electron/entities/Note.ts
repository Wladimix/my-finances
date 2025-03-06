import knex from '../connectionDB';
import NoteModel from '../models/NoteModel';
import TransactionModel from '../models/TransactionModel';

import { TablesNames } from '../constants';

export default class Note {

    id: number;
    name: string;

    constructor(id: number | null = null, name: string | null = null) {
        this.id = id ?? 0;
        this.name = name ?? '';
    }

    async getOne(): Promise<void> {

        if (this.name) {

            const note = await NoteModel.getOneByName(this.name);

            if (note !== undefined) {
                this.id = note.id;
            }

        }

    }

    async add(name: string | null): Promise<void> {
        await knex(TablesNames.NOTES).insert({ name });
        await this.getOne();
    }

    async deleteExtraNote(name: string) {

        await this.getOne();

        const notesList = await TransactionModel.getAllNotes();
        let deletingNoteId: number | null = this.id;

        for (let note of notesList) {
            if (note.name === name) {
                deletingNoteId = null;
            }
        }

        if (deletingNoteId) {
            await NoteModel.deleteById(deletingNoteId);
        }

    }

}
