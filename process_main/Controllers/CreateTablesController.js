const Constants = require("../Constants.js");
const knex = require("../Database/ConnectionDB.js");
const WorkingWithFiles = require("../SupportFunctions/WorkingWithFiles.js");
const DistributionFinancesModel = require("../Database/Models/DistributionFinances.js");
const DistributionFinancesProcessing = require("../Database/ProcessingQueryResults/DistributionFinances.js");

function createTables() {
    if (!WorkingWithFiles.checkForFileAvailability(Constants.DATABASE_PATH)) {
        let distributionFinancesTablePromise = DistributionFinancesModel.createTable(knex);
        DistributionFinancesProcessing.createTableProcessing(distributionFinancesTablePromise);
    }
}

module.exports = {
    createTables
}
