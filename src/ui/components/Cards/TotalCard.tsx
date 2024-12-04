import CalculationService from "../../services/CalculationService"

import { useAppSelector } from "../../storage/store"
import { useEffect, useState } from "react"

export default function TotalCard() {
    const distribytionTypes = useAppSelector(state => state.data.distributionFinancesTypes);
    const [capital, setCapital] = useState<string>("0");

    useEffect(() => { CalculationService.getCapital(setCapital) }, [distribytionTypes]);

    return (
        <div className="uk-card uk-card-default uk-card-body uk-margin">
            <table className="uk-table uk-table-small">
                <tbody>
                    <tr>
                        <td><h1 className="uk-text-bold uk-text-primary">Всего в наличии</h1></td>
                        <td><h1 className="uk-text-primary uk-text-right">{capital}</h1></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
