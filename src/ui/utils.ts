import UIkit from 'uikit';

export function showErrorNotification(message: string) {
    UIkit.notification({
        status: 'danger',
        message
    });
}

export function getLastMonthDay(year: number, month: number): number {
    return month ? new Date(year, month + 1, 0).getDate() : 31;
}
