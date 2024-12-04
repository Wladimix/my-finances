import SpendingCategoryService from "../services/SpendingCategoryService"
import DistributionAndCategoryModal from "./Modals/DistributionAndCategoryModal"
import DistributionService from "../services/DistributionService"
import EditTransactionModal from "./Modals/EditTransactionModal"
import MonthlyYearlyResults from "./MonthlyYearlyResults"
import TotalCard from "./Cards/TotalCard"
import Transactions from "./Transactions"
import TransactionService from '../services/Transaction/TransactionService'
import Statistics from "./Statistics"

import { Chart, CategoryScale } from "chart.js/auto"
import { useAppDispatch, useAppSelector } from "../storage/store"
import { useEffect } from "react"

Chart.register(CategoryScale);

export default function App() {
    const date = useAppSelector(state => state.date);
    const transaction = useAppSelector(state => state.transaction);
    const currentPage = useAppSelector(state => state.pagination);

    const dispath = useAppDispatch();
    const distributionService = new DistributionService(dispath);
    const categoryService = new SpendingCategoryService(dispath);
    const transactionService = new TransactionService(dispath);

    const loadAllData = async (): Promise<void> => {
        await distributionService.loadDistributionTypes();
        await categoryService.loadSpendingCategories();
        await transactionService.loadTransactions({
            year: date.selectedYear,
            month: date.selectedMonth,
            note: transaction.requiredNote,
            page: currentPage
        });
    }

    useEffect(() => { loadAllData() }, []);

    return (
        <>
            <div className="uk-container uk-container-expand uk-padding">

                <TotalCard />
                <MonthlyYearlyResults />

                {
                    transaction.loader
                        ?   <div className="uk-margin uk-text-large uk-text-center uk-alert-primary" data-uk-alert>
                                Загрузка транзакций... <div data-uk-spinner />
                            </div>
                        :   <Transactions />
                }

                <Statistics />

            </div>

            <EditTransactionModal />
            <DistributionAndCategoryModal />
        </>
    );
}
