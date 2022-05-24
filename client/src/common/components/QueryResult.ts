import { SerializedError } from '@reduxjs/toolkit';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { BaseQueryError } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { QueryStatus, QuerySubState } from '@reduxjs/toolkit/dist/query/core/apiState';
import { Id, Override } from '@reduxjs/toolkit/dist/query/tsHelpers';

// TODO move this to a simpler implementation; that de-couples reduxjs/toolkit from components
// entirely. I propose a simple 'Suspense'-like component; but not related to code-splitting at all.
// NOTE suspense _was_ going to relate to data-fetching but currently does not and let's not bank on it
// - I like it being for code-splitting purposes only.
//
// So here... maybe making a <Deferred> or <Task /> component with Task states:
// Created (uninitialized)
// Running,
// Completed
// Faulted
//
// Wrap redux other async calls with useTask.

// Map API call to this. Need to express subtypes in faulted - some are ok, some are not.
// FaultType = GenericFault | ApiFault
// GenericFault = { type: FaultType.Generic; message: string }
// ApiFault = { type: FaultType.Api; statusCode: ...; message: string }
// etc.

export enum QueryResultStatus {
    Uninitialised = 0,
    NotFound,
    Pending,
    Error,
    OK,
}

// Based on private type in buildHooks.d.ts
type UseQueryStateBaseResult<D extends QueryDefinition<any, any, any, any>> = QuerySubState<D> & {
    isUninitialized: false;
    isLoading: false;
    isFetching: false;
    isSuccess: false;
    isError: false;
};

// Based on private type in buildHooks.d.ts
type UseQueryStateDefaultResult<D extends QueryDefinition<any, any, any, any>> = Id<Override<Extract<UseQueryStateBaseResult<D>, {
    status: QueryStatus.uninitialized;
}>, {
    isUninitialized: true;
}> | Override<UseQueryStateBaseResult<D>, {
    isLoading: true;
    isFetching: boolean;
    data: undefined;
} | ({
    isSuccess: true;
    isFetching: boolean;
    error: undefined;
} & Required<Pick<UseQueryStateBaseResult<D>, 'data' | 'fulfilledTimeStamp'>>) | ({
    isError: true;
} & Required<Pick<UseQueryStateBaseResult<D>, 'error'>>)>> & {
    /**
     * @deprecated will be removed in the next versionz
     */
    status: QueryStatus;
};

type Result<D extends QueryDefinition<any, any, any, any>> = UseQueryStateDefaultResult<D>;

type DataFromQuery<D extends QueryDefinition<any, any, any, any>> =
    D extends QueryDefinition<any, any, any, infer RT> ? RT : unknown;

type ErrorFromQuery<D extends QueryDefinition<any, any, any, any>> =
    SerializedError |
    (D extends QueryDefinition<any, infer BaseQuery, any, any> ? BaseQueryError<BaseQuery> : never);

type QueryResultMap<ResultType, ErrorType> = {
    [QueryResultStatus.Uninitialised]?: () => JSX.Element;
    [QueryResultStatus.Pending]?: () => JSX.Element;
    [QueryResultStatus.NotFound]?: () => JSX.Element;
    [QueryResultStatus.Error]?: (error: ErrorType) => JSX.Element;
    [QueryResultStatus.OK]: (data: ResultType) => JSX.Element;
}

interface Props<D extends QueryDefinition<any, any, any, any>, DataType = DataFromQuery<D>, ErrorType = ErrorFromQuery<D>> {
    result: Result<D>;
    children: QueryResultMap<DataType, ErrorType>;
}

/**
 * Conditionally render content based on the state of a useQuery result.
 *
 * Inferring the generated endpoint data and error types proved tricky so have
 * been exposed through the first two generic parameters.
 */
export function QueryResult<
    DataType,
    ErrorType = SerializedError | BaseQueryError<any>,
    D extends QueryDefinition<any, any, any, any> = QueryDefinition<any, any, any, any>
>(
    { result, children }: Props<D, DataType, ErrorType>
) {
    if (!result || result.isUninitialized) return children[QueryResultStatus.Uninitialised]?.() ?? null;
    if (!result.data && (result.isFetching || result.isLoading)) return children[QueryResultStatus.Pending]?.() ?? null;
    if (!result.data) return children[QueryResultStatus.NotFound]?.() ?? null;
    if (result.error) return children[QueryResultStatus.Error]?.(result.error as ErrorType) ?? null;
    return children[QueryResultStatus.OK](result.data as DataType);
}

export function isNotFound<D extends QueryDefinition<any, any, any, any>>(result: Result<D>) {
    return !result.isUninitialized && !result.isFetching && !result.isLoading && !result.error && !result.data;
}
