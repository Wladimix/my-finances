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

export function convertAmount(amount: number): string {
    const array = (amount.toFixed(2)).split('');
    const newArray: (string | string[])[] = [];
    for (let i = -6; i > (-array.length); i = -3) {
        newArray.push(array.splice(i));
        newArray.push(' ');
    }
    newArray.push(array);
    const result = newArray
        .reverse()
        .map(elem => Array.isArray(elem) ? elem.join('') : elem)
        .join('');
    return result + ' ₽';
}
