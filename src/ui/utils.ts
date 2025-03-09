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

export function calcYearlyInflation(inflation: {
    [key: string]: {
        [key: string]: number;
    };
}) {

    if (Object.keys(inflation).length === 0) {
        return null;
    }

    let sum = 0;
    let monthsNumber = 0;

    for (let monthData in inflation) {
        const monthInflation = calcMonthlyInflation(inflation[monthData]);
        if (monthInflation !== null) {
            sum += monthInflation;
            monthsNumber++;
        }
    }

    return monthsNumber
        ? Number((sum / monthsNumber).toFixed(2))
        : null;

}

export function calcMonthlyInflation(inflation: {
    [key: string]: number;
}) {

    if (!inflation) {
        return null;
    }

    const sum = Object.keys(inflation).reduce((acc, curr) => {
        return inflation[curr] !== null ? acc + inflation[curr] : acc;
    }, 0);

    const productsNumber = Object.values(inflation).filter(value => value !== null ).length;
    return productsNumber !== 0
        ? Number((sum / productsNumber).toFixed(2))
        : null;

}
