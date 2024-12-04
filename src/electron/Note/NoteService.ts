import NoteModel, { Note } from "./NoteModel"
import TransactionModel from "../Transaction/TransactionModel"

import { TablesNames } from "../constants"

class NoteService {

    async findMatches(substring: string) {
        const notes = await NoteModel.findMatches(substring);
        console.info(`Получены данные из таблицы "${TablesNames.NOTES_TABLE}"`);

        return notes;
    }

    async findOrAdd(name: string): Promise<Note> {
        console.info(`Поиск примечания в таблице "${TablesNames.NOTES_TABLE}"`);
        const requiredNote = await NoteModel.getOne(name);

        if (requiredNote !== undefined) {
            console.info("Примечание найдено");
            return requiredNote;
        } else {
            console.info("Примечание не найдено");
            await NoteModel.add(name);
            console.info(`Добавлено примечание в таблицу "${TablesNames.NOTES_TABLE}"`);
            const requiredNote = await NoteModel.getOne(name) as Note;
            return requiredNote;
        }
    }

    async deleteExtraNote(id: number, name: string) {
        const notesList = await TransactionModel.getNotes();
        console.info("Получен список примечаний");

        for (let note of notesList) {
            if (note.name === name) {
                return;
            }
        }

        const result = await NoteModel.delete(id, name);
        if (result) console.info("Удалено лишнее примечание");
    }

}

export default new NoteService();
