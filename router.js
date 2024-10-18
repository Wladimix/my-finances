const DistributionController = require('@main/DistributionFinances/DistributionController.js');

const { ipcMain } = require("electron");

function useRouter() {
    ipcMain.handle("get-all-distribution-types", DistributionController.getAllDistributionTypes);
    ipcMain.handle("add-distribution-type", DistributionController.addDistributionType);
    ipcMain.handle("edit-distribution-type", DistributionController.editDistributionType);
    ipcMain.handle("delete-distribution-type", DistributionController.deleteDistributionType);
}

module.exports = useRouter;
