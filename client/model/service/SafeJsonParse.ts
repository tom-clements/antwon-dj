enum ParseResultStatus {
    Success,
    Error,
}

type ParseResultSuccess<T> = { status: ParseResultStatus.Success, result: T };
type ParseResultError = { status: ParseResultStatus.Error, errorType: "UnexpectedType" | "CouldNotParse", error?: any };
type ParseResult<T> = ParseResultSuccess<T> | ParseResultError;

export function isParseSuccess<T>(result: ParseResult<T>): result is ParseResultSuccess<T> {
    return result.status === ParseResultStatus.Success;
}

export const safeJsonParse = <T>(typeGuard: (o: any) => o is T) => (jsonString: string): ParseResult<T> => {
    try {
        const parsed = JSON.parse(jsonString);
        return typeGuard(parsed)
            ? { status: ParseResultStatus.Success, result: parsed }
            : { status: ParseResultStatus.Error, errorType: "UnexpectedType" };
    } catch (error) {
        return { status: ParseResultStatus.Error, errorType: "CouldNotParse", error };
    }
}

export const selectFromJson = <R, T>(typeGuard: (o: any) => o is T, jsonString: string, selector: (result: T) => R): R => {
    const parsed = safeJsonParse(typeGuard)(jsonString);
    if (isParseSuccess(parsed)) return selector(parsed.result);
    throw parsed.error;
}
