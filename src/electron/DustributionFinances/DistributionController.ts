import DistributionService from "./DistributionService"
import ErrorHandling from "../lib/ErrorHandling"

import { RequestStatuses } from "../constants"

class DistributionController {

    async getAllDistributionTypes(): Promise<ResponceData<GetDistributionTypeDTO[]>> {
        try {
            const allDistributionTypes = await DistributionService.getAll();

            return {
                data: allDistributionTypes,
                status: RequestStatuses.SUCCESS,
                message: "Получены типы распределения финансов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка получения типов распределения финансов")
            }
        }
    }

    async addDistributionType(distributionType: AddDistributionTypeDTO): Promise<ResponceData<number>> {
        try {
            const distributionId = await DistributionService.add(distributionType);

            return {
                data: distributionId,
                status: RequestStatuses.SUCCESS,
                message: "Добавлен тип распределения финансов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка добавления типа распределения финансов")
            }
        }
    }

    async editDistributionType(distributionType: EditDistributionTypeDTO): Promise<ResponceData<boolean>> {
        try {
            const isSuccess = await DistributionService.edit(distributionType);

            return {
                data: isSuccess,
                status: RequestStatuses.SUCCESS,
                message: "Отредактирован тип распределения финансов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка редактирования типа распределения финансов")
            }
        }
    }

    async deleteDistributionType(distributionType: DeleteDistributionTypeDTO): Promise<ResponceData<boolean>> {
        try {
            const isSuccess = await DistributionService.delete(distributionType);

            return {
                data: isSuccess,
                status: RequestStatuses.SUCCESS,
                message: "Удалён тип распределения финансов"
            }
        } catch (error) {
            return {
                data: null,
                status: RequestStatuses.ERROR,
                message: await ErrorHandling.makeErrorMessage(error as Error, "Ошибка удаления типа распределения финансов")
            }
        }
    }

}

export default new DistributionController();
