import NoteService from "./NoteService"
import ErrorHandling from "../lib/ErrorHandling"

import { RequestStatuses } from "../constants"

class NoteController {

    async getNotes(substring: string): Promise<ResponceData<GetNoteDTO[]>> {
        try {
            const notes = await NoteService.findMatches(substring);

            return {
                data: notes,
                status: RequestStatuses.SUCCESS,
                message: "Получен список примечаний"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка получения списка примечаний")
            }
        }
    }

}

export default new NoteController();
