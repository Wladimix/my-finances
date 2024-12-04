import DistributionModel from "./DustributionModel"
import ObjectEditing from "../lib/ObjectEditing"

import { convertAmountToNumber, convertAmountToString, removeSpaces } from "../lib/utils"
import { TablesNames } from "../constants"

class DistributionService {

    async getAll(): Promise<AllDistributionTypes> {
        const distributionTypes = await DistributionModel.getAll();
        console.info(`Получены данные из таблицы "${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME}"`);

        return distributionTypes.map(distributionType =>
            new ObjectEditing(distributionType).changeProperty("amount", convertAmountToString).getResult()
        ) as AllDistributionTypes;
    }

    async add(distributionType: AddDistributionTypeDTO): Promise<number> {
        const name = removeSpaces(distributionType.name);
        const amount = convertAmountToNumber(distributionType.amount);

        const distributionId = await DistributionModel.add(name, amount);
        console.info(`Запись "${name}" в таблице "${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME}" создана`);

        return distributionId;
    }

    async edit(distributionType: EditDistributionTypeDTO): Promise<boolean> {
        const id = distributionType.id;
        const name = removeSpaces(distributionType.name);
        const amount = convertAmountToNumber(distributionType.amount);

        const isSuccess = Boolean(await DistributionModel.edit(id, name, amount));
        console.info(`Запись #${id} в таблице "${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME}" отредактирована`);

        return isSuccess;
    }

    async delete(distributionType: DeleteDistributionTypeDTO): Promise<boolean> {
        const id = distributionType.id;
        const name = removeSpaces(distributionType.name);
        const amount = convertAmountToNumber(distributionType.amount);

        if (amount !== 0) {
            throw new Error("Удаление невозможно, сумма должна равняться 0");
        }

        const currentDate = new Date().getFullYear() + "."
            + (new Date().getMonth() + 1) + "."
            + new Date().getDate() + " "
            + new Date().getHours() + ":"
            + new Date().getMinutes() + ":"
            + new Date().getMilliseconds();

        const newName = name + `(удалено ${currentDate})`;

        await DistributionModel.edit(id, newName, amount);
        const isSuccess = Boolean(await DistributionModel.delete(id));
        console.info(`Запись #${id} в таблице "${TablesNames.DISTRIBUTION_OF_FINANCES_TABLE_NAME}" отмечена, как удалённая`);

        return isSuccess;
    }

    async addAmountToDistribution(id: number, amount: number): Promise<void> {
        const distributionType = await DistributionModel.getOne(id);
        const name = distributionType.name;
        const newAmount = distributionType.amount + amount;
        await DistributionModel.edit(id, name, newAmount);
        console.info(`В записи "${name}" увеличена сумма`);
    }

    async subtractAmountFromDistribution(id: number, amount: number): Promise<void> {
        const distributionType = await DistributionModel.getOne(id);
        const name = distributionType.name;
        const newAmount = distributionType.amount - amount;
        await DistributionModel.edit(id, name, newAmount);
        console.info(`В записи "${name}" уменьшена сумма`);
    }
};

export default new DistributionService();

type AllDistributionTypes = {
    id: number
    name: string
    amount: string
}[]
