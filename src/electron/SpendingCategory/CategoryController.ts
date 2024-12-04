import CategoryService from "./CategoryService"
import ErrorHandling from "../lib/ErrorHandling"

import { RequestStatuses } from "../constants"

class CategoryController {

    async getAllCategories(): Promise<ResponceData<GetCategoryDTO[]>> {
        try {
            const allCategories = await CategoryService.getAll();

            return {
                data: allCategories,
                status: RequestStatuses.SUCCESS,
                message: "Получены категории расходов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка получения категорий расходов")
            }
        }
    }

    async addSpendingCategory(spendingCategory: AddSpendingCategoryDTO): Promise<ResponceData<number>> {
        try {
            const spendingCategoryId = await CategoryService.add(spendingCategory);

            return {
                data: spendingCategoryId,
                status: RequestStatuses.SUCCESS,
                message: "Добавлена категория расходов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка добавления категории расходов")
            }
        }
    }

    async editSpendingCategory(spendingCategory: EditSpendingCategoryDTO): Promise<ResponceData<boolean>> {
        try {
            const isSuccess = await CategoryService.edit(spendingCategory);

            return {
                data: isSuccess,
                status: RequestStatuses.SUCCESS,
                message: "Отредактирована категория расходов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка редактирования категории расходов")
            }
        }
    }

    async deleteSpendingCategory(spendingCategory: DeleteSpendingCategoryDTO): Promise<ResponceData<boolean>> {
        try {
            const isSuccess = await CategoryService.delete(spendingCategory);

            return {
                data: isSuccess,
                status: RequestStatuses.SUCCESS,
                message: "Удалена категория расходов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка удаления категории расходов")
            }
        }
    }

}

export default new CategoryController();
