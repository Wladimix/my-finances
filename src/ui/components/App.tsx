import Accounts from './Accounts/Accounts';
import Categories from './Categories/Categories';
import Statistics from './Statistics/Statistics';
import TotalInformation from './TotalInformation/TotalInformation';
import TotalStatistics from './TotalStatistics/TotalStatistics';
import Transactions from './Transactions/Transactions';

import { Chart, CategoryScale } from 'chart.js/auto';
import { getAllAccounts } from '../storage/accountStore';
import { getAllCategories } from '../storage/categoryStore';
import { getAllTransations } from '../storage/transactionStore';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';

Chart.register(CategoryScale);

export default function App() {
    const getAllAccountsEvent = useUnit(getAllAccounts);
    const getAllCategoriesEvent = useUnit(getAllCategories);
    const getAllTransationsEvent = useUnit(getAllTransations);

    useEffect(() => {
        getAllAccountsEvent();
        getAllCategoriesEvent();
        getAllTransationsEvent();
    }, []);

    return (
        <div className='uk-container uk-container-large uk-margin-top uk-margin-bottom'>
            <TotalInformation />
            <Transactions />
            <Accounts />
            <Categories />
            <Statistics />
            <TotalStatistics />
        </div>
    );
}
