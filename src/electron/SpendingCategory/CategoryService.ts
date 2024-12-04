import CategoryModel from "./CategoryModel"

import { removeSpaces } from "../lib/utils"
import { TablesNames } from "../constants"

class CategoryService {

    async getAll(): Promise<AllSpendingCategoriesType> {
        const categories = await CategoryModel.getAll();
        console.info(`Получены данные из таблицы "${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}"`);

        return categories;
    }

    async add(spendingCategory: AddSpendingCategoryDTO): Promise<number> {
        const name = removeSpaces(spendingCategory.name);

        const spendingCategoryId = await CategoryModel.add(name);
        console.info(`Запись "${name}" в таблице "${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}" создана`);

        return spendingCategoryId;
    }

    async edit(spendingCategory: EditSpendingCategoryDTO): Promise<boolean> {
        const id = spendingCategory.id;
        const name = removeSpaces(spendingCategory.name);

        const isSuccess = Boolean(await CategoryModel.edit(id, name));
        console.info(`Запись #${id} в таблице "${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}" отредактирована`);

        return isSuccess;
    }

    async delete(spendingCategory: DeleteSpendingCategoryDTO): Promise<boolean> {
        const id = spendingCategory.id;

        const currentDate = new Date().getFullYear() + "."
            + (new Date().getMonth() + 1) + "."
            + new Date().getDate() + " "
            + new Date().getHours() + ":"
            + new Date().getMinutes() + ":"
            + new Date().getMilliseconds();

        const newName = spendingCategory.name + `(удалено ${currentDate})`;

        await CategoryModel.edit(id, newName);
        const isSuccess = Boolean(await CategoryModel.delete(id));
        console.info(`Запись #${id} удалена из таблицы "${TablesNames.SPENDING_CATEGORIES_TABLE_NAME}"`);

        return isSuccess;
    }
}

export default new CategoryService();

type AllSpendingCategoriesType = {
    id: number
    name: string
}[]
