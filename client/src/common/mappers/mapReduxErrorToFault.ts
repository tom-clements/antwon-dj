import type { ApiCallError } from 'common/model/ApiCallError';
import { SerializedError } from '@reduxjs/toolkit';
import { apiFault, fault, Fault } from 'common/model/Fault';
import { isApiCallError } from 'common/predicates/isApiCallError';
import { HttpStatusCode } from 'common/model/HttpStatusCode';
import { RtkQueryError } from 'common/model/RtkQueryError';
import { isRtkQueryError } from 'common/predicates/isReduxError';

const handleApiCallError = (error: ApiCallError): Fault => {
    if (error.status in HttpStatusCode) {
        return apiFault(error.status, error.data.Code, error.data.Message);
    }

    return apiFault(HttpStatusCode.ImATeapot, error.data.Code, error.data.Message);
};

const handleRtkQueryError = (error: RtkQueryError): Fault => {
    return fault(`[${error.originalStatus}] ${error.status}`, error.error, undefined, error.data);
};

const handleSerializedError = (error: SerializedError): Fault => {
    return fault(error.name, error.message, undefined, error.stack);
};

export const mapReduxErrorToFault = (error: SerializedError | RtkQueryError | ApiCallError): Fault => {
    if (isApiCallError(error)) return handleApiCallError(error);
    if (isRtkQueryError(error)) return handleRtkQueryError(error);
    return handleSerializedError(error);
};
