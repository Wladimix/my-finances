import ExpenditureStatistics from "../Statistics/ExpenditureStatistics"

import { NOT_DEFINE } from "../../constants"
import { useAppSelector } from "../../storage/store"

export default function YearlyStatisticCard() {
    const date = useAppSelector(state => state.date);

    return (
        <div className="uk-card uk-card-default uk-card-body uk-background-muted">

            <h1 className="uk-heading-medium">
                {date.selectedYear !== NOT_DEFINE ? date.selectedYear : <span data-uk-icon="icon: calendar; ratio: 3"></span>}
            </h1>

            {
                date.selectedYear !== NOT_DEFINE
                    ?   <ExpenditureStatistics date={{ selectedYear: date.selectedYear, selectedMonth: NOT_DEFINE }} />
                    :   <div className="uk-alert-primary" data-uk-alert>
                            год не выбран
                        </div>
            }

        </div>
    );
}
