import monthsDictionary from "./monthsDictionary"
import UIkit from "uikit"

export function showNotification({ status, message } : ResponceData<any>, { onlyErrorChecking }: { onlyErrorChecking: boolean } = { onlyErrorChecking: false }) {

    if (status === "success" && !onlyErrorChecking) {
        UIkit.notification({
            status: "success",
            message
        });
    }

    if (status === "error") {
        UIkit.notification({
            status: "danger",
            message
        });
    }

}

export function checkAmount(amount: string): boolean {
    return /^[\d\s]*?(\.\d{1,2})?(\s₽)?$/.test(amount);
}

export function makeDate(date: Date): string {
    return monthsDictionary[date.getMonth()] + " " + date.getFullYear();
}
