import MonthlyResultsCard from "./Cards/MonthlyResultsCard"
import YearlyResultsCard from "./Cards/YearlyResultsCard"

export default function MonthlyYearlyResults() {
    return (
        <div data-uk-grid>
            <div className="uk-width-1-2">
                <YearlyResultsCard />
            </div>
            <div className="uk-width-1-2">
                <MonthlyResultsCard />
            </div>
        </div>
    );
}
