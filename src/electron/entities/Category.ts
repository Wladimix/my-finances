import CategoryModel from '../models/CategoryModel';

import { NewEntities } from '../constants';

export default class Category {

    id: number;
    name: string;
    isDeleted:  0 | 1;

    constructor(
        id: number | null = null,
        name: string | null = null,
        isDeleted:  0 | 1 = 0
    ) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.isDeleted = isDeleted;
    }

    async getAll(): Promise<ICategory[]> {
        return await CategoryModel.getAll();
    }

    async add(): Promise<void> {
        const category = await CategoryModel.getOneByName(NewEntities.NEW_CATEGORY);

        if (category !== undefined) {
            throw new Error('такая категория уже существует');
        }

        await CategoryModel.add();
    }

    async editName(id: number, name: string): Promise<void> {
        if (this.id) {

            const existingCategory = await CategoryModel.getOneByName(name);

            if (existingCategory !== undefined) {
                throw new Error('такая категория уже существует');
            }

            await CategoryModel.editNameById(id, name);

        }
    }

    async editDeletionField(id: number, isDeleted: 0 | 1): Promise<void> {
        if (this.id) {

            const category = await CategoryModel.getOneById(id);

            if (category) {
                const name = category.name + `(удалено ${Date.now()})`;
                await CategoryModel.editDeletionFieldById(id, name, isDeleted);
            }

        }
    }

}
