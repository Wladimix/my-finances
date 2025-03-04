export function makeError(error: Error, customErrorMessage: string): string {
    const systemErrorMessage = error.message;
    const errorMessage = customErrorMessage + ':\n' + systemErrorMessage;

    console.log(errorMessage);
    return errorMessage;
}

export function getLastMonthDay(year: string | null, month: string | null): number {
    return month ? new Date(Number(year), Number(month) + 1, 0).getDate() : 31;
}
