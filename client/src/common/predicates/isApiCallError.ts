import type { ApiCallError } from 'common/model/ApiCallError';

export const isApiCallError = (value: any): value is ApiCallError =>
    typeof value?.status === 'number' &&
    typeof value?.data?.Code === 'string' &&
    typeof value?.data?.Message === 'string';
