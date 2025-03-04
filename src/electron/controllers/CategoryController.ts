import Category from '../entities/Category';

import { makeError } from '../utils';

export default class CategoryController {

    static async getAllCategories(): Promise<ResponceData<ICategory[]>> {
        try {

            const category = new Category();

            return {
                data: await category.getAll(),
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения категорий');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async addCategory(): Promise<ResponceData<null>> {
        try {

            const category = new Category();
            await category.add();

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка создания категории');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editCategoryName({ id, name }: { id: number, name: string }): Promise<ResponceData<null>> {
        try {

            const category = new Category(id);
            await category.editName(id, name);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования названия категории');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    static async editCategoryDeletionField({ id, isDeleted }: { id: number, isDeleted: 0 | 1 }): Promise<ResponceData<null>> {
        try {

            const category = new Category(id);
            await category.editDeletionField(id, isDeleted);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования поля удаления категории');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

}
