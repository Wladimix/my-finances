import { findSubString } from "./utils"
import { getTablesNames } from "../connectionDB"

class ErrorService {

    errorsDictionary: Object;

    constructor(errorsDictionary: Object) {
        this.errorsDictionary = errorsDictionary;
    }

    async makeErrorMessage(errorObject: Error, commonErrorMessage: string): Promise<string> {
        console.error(commonErrorMessage + ":");
        console.log(errorObject);

        const tables = await getTablesNames();

        const currentTable = findSubString(errorObject.message, tables);
        const currentError = findSubString(errorObject.message, Object.keys(this.errorsDictionary));

        const resultErrorMessage = currentError
            ? this.parseTableName(this.errorsDictionary[currentError], currentTable)
            : null;

        return resultErrorMessage ?? commonErrorMessage;
    }

    parseTableName(targetString: string, tableName: string | false): string {
        return tableName
            ? targetString.replace("--table-name--", tableName)
            : targetString;
    }

}

export default new ErrorService({
    "SQLITE_ERROR: no such column":                               "Ошибка базы данных: обращение к несуществующей колонке",
    "SQLITE_CONSTRAINT: UNIQUE":                                  "Такое значение уже существует",
    "SQLITE_CONSTRAINT: NOT NULL constraint failed":              "Ошибка в таблице «--table-name--»: некоторые значения не допускают NULL",
    "SQLITE_ERROR: no such table":                                "Обращение к несуществующей таблице",

    "Добавление транзакции невозможно: недостаточно средств":     "Добавление транзакции невозможно: недостаточно средств",
    "Редактирование транзакции невозможно: недостаточно средств": "Редактирование транзакции невозможно: недостаточно средств",
    "Удаление транзакции невозможно: недостаточно средств":       "Удаление транзакции невозможно: недостаточно средств",
    "Удаление невозможно, сумма должна равняться 0":              "Удаление невозможно, сумма должна равняться 0"
});
