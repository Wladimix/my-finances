export function makeError(error: Error, customErrorMessage: string): string {
    const systemErrorMessage = error.message;
    const errorMessage = customErrorMessage + ':\n' + systemErrorMessage;

    console.log(errorMessage);
    return errorMessage;
}
