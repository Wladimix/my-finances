import { Knex } from "knex"
import { NOT_DEFINE } from "../constants"

export function convertAmountToNumber(amount: string): number {
    amount = amount === "" ? "0.00" : amount;
    return parseFloat(removeSpaces(amount, { removeAllSpaces: true }));
}

export function removeSpaces(string: string, { removeAllSpaces }: { removeAllSpaces: boolean } = { removeAllSpaces: false }): string {
    return removeAllSpaces
        ? string.trim().replace(/ +/g, '')
        : string.trim().replace(/ +/g, ' ');
}

export function convertAmountToString(amount: number): string {
    const array = (amount.toFixed(2)).split("");
    const newArray: (string | string[])[] = [];

    for (let i = -6; i > (-array.length); i = -3) {
        newArray.push(array.splice(i));
        newArray.push(" ");
    }

    newArray.push(array);

    const result = newArray
        .reverse()
        .map(elem => Array.isArray(elem) ? elem.join("") : elem)
        .join("");

    return result + " ₽";
}

export function findSubString(targetString: string, searchStringsArray: string[]): string | false {
    let searchString: string | false = false;

    for (let string of searchStringsArray) {
        if (targetString.includes(string)) {
            searchString = string;
            break;
        }
    }

    return searchString;
}

export function makeDateSearchOptions(year: string, month: string): [Knex.DbColumn<Date>, Knex.DbColumn<Date>] {
    return [
        new Date(year && year !== NOT_DEFINE ? Number(year) : 1970,                     month && month !== NOT_DEFINE ? Number(month) : 0,  1,                      0,  0,  0),
        new Date(year && year !== NOT_DEFINE ? Number(year) : new Date().getFullYear(), month && month !== NOT_DEFINE ? Number(month) : 11, getLastMonthDay(month), 23, 59, 59)
    ];
}

function getLastMonthDay(month: string): number {
    return month && month !== NOT_DEFINE ? new Date(1970, Number(month) + 1, 0).getDate() : 31;
}

export function filterOutUniqueValues<T extends Object>(array: Array<T>, key: keyof T): Array<T[keyof T]> {
    return Array.from(new Set(array.map(item => item[key])));
}
