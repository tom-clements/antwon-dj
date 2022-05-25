import { fault, GenericFault } from 'common/model/Fault';

export const mapErrorToFault = (error: Error): GenericFault => {
    return fault(
        error.name,
        error.message,
        error.cause ? mapErrorToFault(error.cause) : undefined,
        error.stack
    );
};
