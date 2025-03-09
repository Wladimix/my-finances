import TransactionModel from '../models/TransactionModel';

export async function getInflationData(year: string): Promise<IInflationData> {

    const recordsForInflation = await TransactionModel.getRecordsForInflation(year);
    const recordsSortedByDate = getRecordsSortedByDate(recordsForInflation, year);
    const allRecords = getAllRecords(recordsForInflation, year);

    const inflation: {
        [key: string]: {
            [key: string]: number
        }
    } = {};

    for (let i = 12; i >= 1; i--) {

        allRecords.forEach(product => {

            const monthlyInflationProductData = getMonthlyInflationProductData(product, recordsSortedByDate, String(i) as keyof IInflationData);

            for (let month in monthlyInflationProductData) {

                if (!inflation[month]) {
                    inflation[month] = {};
                }

                if (inflation[month][product] == null) {

                    inflation[month] = {
                        ...inflation[month],
                        [product]: monthlyInflationProductData[month]
                    };

                }

            }

        });

    }

    return {
        averageCost: getAverageCostData(recordsSortedByDate, allRecords),
        inflation
    };

}

function getAverageCostData(recordsSortedByDate: IRecordsSortedByDate, allRecords: string[]): {[key: string]: { [key: string]: number }} {

    const averageCost: {
        [key: string]: {
            [key: string]: number
        }
    } = {};

    for (let month in recordsSortedByDate) {
        allRecords.forEach(currentProduct => {

            const products = recordsSortedByDate[month].filter(product => product.note === currentProduct);
            const sumAmount = products.reduce((acc, curr) => acc + curr.amount, 0);
            const count = products.length;

            if (!averageCost[month]) {
                averageCost[month] = {};
            }

            if (count) {
                averageCost[month][currentProduct] = sumAmount / count;
            }

        });
    }

    return averageCost;

}

function getRecordsSortedByDate(recordsForInflation: IRecordForInflation[], year: string): IRecordsSortedByDate {

    const recordsSortedByDate: IRecordsSortedByDate = {};

    recordsForInflation.forEach(record => {

        const month = new Date(record.date).getFullYear() === +year - 1
            ? 0
            : new Date(record.date).getMonth() + 1;

        if (recordsSortedByDate[month]) {
            recordsSortedByDate[month].push({ note: record.note, amount: record.amount });
        } else {
            recordsSortedByDate[month] = [{ note: record.note, amount: record.amount }];
        }

    });

    return recordsSortedByDate;

}

function getAllRecords(recordsForInflation: IRecordForInflation[], year: string): string[] {

    const allRecords: string[] = [];

    recordsForInflation.forEach(product => {
        if (new Date(product.date).getFullYear() === Number(year)) {
            allRecords.push(product.note);
        }
    });

    return [ ...new Set(allRecords) ];

}

function getMonthlyInflationProductData(currentProduct: string, recordsSortedByDate: IRecordsSortedByDate, currentMonthIndex: keyof IInflationData): IMonthlyInflationData {

    let inflationData: IMonthlyInflationData = {
        '1': null, '2': null, '3': null, '4': null,
        '5': null, '6': null, '7': null, '8': null,
        '9': null, '10': null, '11': null, '12': null
    };

    if (!recordsSortedByDate[currentMonthIndex]) {
        return inflationData;
    }

    const productsForTargetMonth = recordsSortedByDate[currentMonthIndex]
        .filter(product => product.note === currentProduct);

    const lastRecordInTargetMonth = productsForTargetMonth.length
        ? productsForTargetMonth[productsForTargetMonth.length - 1]
        : null;

    if (!lastRecordInTargetMonth) {
        return inflationData;
    }

    for (let i = 1; i <= Number(currentMonthIndex); i++) {

        if (!recordsSortedByDate[i - 1]) {
            continue;
        }

        const productsForPreviousMonth = recordsSortedByDate[i - 1]
            .filter(product => product.note === currentProduct);

        const lastRecordInPreviousMonth = productsForPreviousMonth.length
            ? productsForPreviousMonth[productsForPreviousMonth.length - 1]
            : null;

        if (lastRecordInPreviousMonth) {

            for (let month in inflationData) {

                if (Number(month) < i) {
                    inflationData[month] = null;
                } else {
                    inflationData[month] = calcAverageInflation(
                        lastRecordInPreviousMonth.amount,
                        lastRecordInTargetMonth.amount,
                        Number(currentMonthIndex) - (i - 1)
                    );
                }

                if (month == currentMonthIndex) {
                    break;
                }

            }

        }

    }

    const firstRecordInTargetMonth = productsForTargetMonth.length && productsForTargetMonth.length > 1
        ? productsForTargetMonth[0]
        : null;

    if (firstRecordInTargetMonth && !inflationData[currentMonthIndex]) {

        const defaultIndlationData = {
            '1': null, '2': null, '3': null, '4': null,
            '5': null, '6': null, '7': null, '8': null,
            '9': null, '10': null, '11': null, '12': null
        };

        inflationData = {
            ...defaultIndlationData,
            [currentMonthIndex]: calcInflation(firstRecordInTargetMonth.amount, lastRecordInTargetMonth.amount)
        };

    }

    return inflationData;

}

function calcAverageInflation(prevAmount: number, currAmount: number, numberOfMonths: number): number {
    const inflation = calcInflation(prevAmount, currAmount);
    return +((Math.pow((inflation / 100 + 1), (1 / numberOfMonths)) - 1) * 100).toFixed(2);
}

function calcInflation(prevAmount: number, currAmount: number): number {
    return +(((currAmount * 100) / prevAmount) - 100).toFixed(2);
}

interface IMonthlyInflationData {
    '1': number | null, '2': number | null, '3': number | null, '4': number | null,
    '5': number | null, '6': number | null, '7': number | null, '8': number | null,
    '9': number | null, '10': number | null, '11': number | null, '12': number | null
}
