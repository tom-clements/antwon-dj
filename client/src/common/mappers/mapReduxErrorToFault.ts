import type { ApiCallError } from 'common/model/ApiCallError';
import { SerializedError } from '@reduxjs/toolkit';
import { apiFault, fault, Fault } from 'common/model/Fault';
import { isApiCallError } from 'common/predicates/isApiCallError';
import { HttpStatusCode } from 'common/model/HttpStatusCode';

const handleApiCallError = (error: ApiCallError): Fault => {
    if (error.status in HttpStatusCode) {
        return apiFault(error.status, error.data.Code, error.data.Message);
    }

    return apiFault(HttpStatusCode.ImATeapot, error.data.Code, error.data.Message);
};

const handleSerializedError = (error: SerializedError) => {
    return fault(error.name, error.message, undefined, error.stack);
};

export const mapReduxErrorToFault = (error: SerializedError | ApiCallError): Fault => {
    if (isApiCallError(error)) return handleApiCallError(error);
    return handleSerializedError(error);
};
