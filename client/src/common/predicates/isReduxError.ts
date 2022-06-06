import type { SerializedError } from '@reduxjs/toolkit';
import { ApiCallError } from 'common/model/ApiCallError';
import type { RtkQueryError } from 'common/model/RtkQueryError';
import { isApiCallError } from 'common/predicates/isApiCallError';

export const isRtkQueryError = (error: any): error is RtkQueryError =>
    typeof error?.data === 'string' &&
    typeof error?.error === 'string' &&
    typeof error?.originalStatus === 'number' &&
    typeof error?.status === 'string';


export const isSerializedError = (error: any): error is SerializedError =>
    typeof error?.name === 'string' &&
    typeof error?.message === 'string' &&
    typeof error?.stack === 'string' &&
    typeof error?.code === 'string';

type ReduxError =
    RtkQueryError |
    SerializedError |
    ApiCallError;

export const isReduxError = (error : any): error is ReduxError => 
    isRtkQueryError(error) ||
    isSerializedError(error) ||
    isApiCallError(error);
