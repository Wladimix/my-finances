import MonthlyCard from './Cards/MonthlyCard';
import TotalCard from './Cards/TotalCard';
import YearlyCard from './Cards/YearlyCard';

export default function TotalInformation() {
    return(
        <>
            <TotalCard />

            <div className='uk-child-width-expand' data-uk-grid>

                <div>
                    <YearlyCard />
                </div>

                <div>
                    <MonthlyCard />
                </div>

            </div>
        </>
    );
}
