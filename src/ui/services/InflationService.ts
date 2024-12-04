import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { InflationState, setInflation } from "../storage/inflationSlice"
import { NOT_DEFINE } from "../constants"
import { showNotification } from "../lib/utils"

class InflationService {

    private dispatch;

    constructor(dispatch: ThunkDispatch<{ data: InflationState }, undefined, UnknownAction> & Dispatch<UnknownAction> | null = null) {
        this.dispatch = dispatch;
    }

    async loadInflationData(year: string) {
        if (this.dispatch && year !== NOT_DEFINE) {
            const inflationData = await window.electron.getInflationData(Number(year));
            showNotification(inflationData, {onlyErrorChecking: true});
            this.dispatch(setInflation(inflationData.data));
        }
    }

    calculateTotalInflation(inflationData: InflationDTO): number {
        let sum = 0;
        Object.values(inflationData).forEach(product => { sum += product });
        return +(sum / Object.keys(inflationData).length).toFixed(2);
    }

}

export default InflationService;
