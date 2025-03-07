import Note from '../entities/Note';

import { makeError } from '../utils';

export default class NoteController {

    static async getNotes(substring: string): Promise<ResponceData<INote[]>> {
        try {

            const note = new Note();

            return {
                data: await note.findMatches(substring),
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения примечаний');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

}