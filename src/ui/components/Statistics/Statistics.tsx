import MonthlyCard from './Cards/MonthlyCard';
import YearlyCard from './Cards/YearlyCard';

export default function Statistics() {
    return(
        <>
            <h1 id='statistics' className='uk-heading-divider'><span>Статистика</span></h1>

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
