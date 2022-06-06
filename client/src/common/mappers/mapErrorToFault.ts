import { mapReduxErrorToFault } from 'common/mappers/mapReduxErrorToFault';
import { Fault, fault } from 'common/model/Fault';
import { isReduxError } from 'common/predicates/isReduxError';

export const mapErrorToFault = (error: Error): Fault => {
    return fault(
        error.name,
        error.message,
        error.cause ? mapErrorToFault(error.cause) : undefined,
        error.stack
    );
};

export const mapUnknownErrorToFault = (error: unknown): Fault => {
    if (isReduxError(error)) return mapReduxErrorToFault(error);
    return error instanceof Error
        ? mapErrorToFault(error)
        : fault();
};
