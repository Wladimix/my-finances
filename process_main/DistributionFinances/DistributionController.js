const ErrorService = require("@main/Error/ErrorService.js");

const { getAllDistributionTypes, addDistributionType, editDistributionType, deleteDistributionType } = require("@main/DistributionFinances/DistributionService.js");
const { REQUEST_STATUS_SUCCESS, REQUEST_STATUS_ERROR } = require("@main/MainConstants.js");

class DistributionController {

    async getAllDistributionTypes() {
        try {
            const allDistributionTypes = await getAllDistributionTypes();

            return {
                data: allDistributionTypes,
                status: REQUEST_STATUS_SUCCESS,
                message: "Получены типы распределения финансов"
            }
        } catch (error) {
            return {
                status: REQUEST_STATUS_ERROR,
                message: await ErrorService.makeErrorMessage(error, "Ошибка получения типов распределения финансов")
            };
        };
    };

    async addDistributionType(event, data) {
        try {
            await addDistributionType(data);

            return {
                status: REQUEST_STATUS_SUCCESS,
                message: "Добавлен тип распределения финансов"
            };
        } catch (error) {
            return {
                status: REQUEST_STATUS_ERROR,
                message: await ErrorService.makeErrorMessage(error, "Ошибка добавления типа распределения финансов")
            };
        };
    };

    async editDistributionType(event, data) {
        try {
            await editDistributionType(data);

            return {
                status: REQUEST_STATUS_SUCCESS,
                message: "Тип распределения финансов отредактирован"
            };
        } catch (error) {
            return {
                status: REQUEST_STATUS_ERROR,
                message: await ErrorService.makeErrorMessage(error, "Ошибка редактирования типа распределения финансов")
            };
        };
    };

    async deleteDistributionType(event, data) {
        try {
            await deleteDistributionType(data);

            return {
                status: REQUEST_STATUS_SUCCESS,
                message: "Тип распределения финансов удалён"
            };
        } catch (error) {
            return {
                status: REQUEST_STATUS_ERROR,
                message: await ErrorService.makeErrorMessage(error, "Ошибка удаления типа распределения финансов")
            };
        };
    };

};

module.exports = new DistributionController();
