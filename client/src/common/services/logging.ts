import { mapUnknownErrorToFault } from 'common/mappers/mapErrorToFault';
import { Fault, FaultType } from 'common/model/Fault';

export const logError = (error: unknown) => {
    logFault(mapUnknownErrorToFault(error));
};

export const logFault = (fault: Fault) => {
    const message = `[${FaultType[fault.type]}] ${fault.message}`;
    console.error(message);
};
