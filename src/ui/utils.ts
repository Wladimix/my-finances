import UIkit from 'uikit';

export function showErrorNotification(message: string) {
    UIkit.notification({
        status: 'danger',
        message
    });
}

export function getLastMonthDay(month: number): number {
    return month ? new Date(1970, month + 1, 0).getDate() : 31;
}
