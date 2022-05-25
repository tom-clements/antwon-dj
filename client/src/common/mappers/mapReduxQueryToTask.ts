import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { ResultTypeFrom } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { QueryStateSelector } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { mapReduxErrorToFault } from 'common/mappers/mapReduxErrorToFault';
import { completedTask, faultedTask, resultedTask, runningTask, task, Task } from 'common/model/Task';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseQueryStateDefaultResult<TUseQuery> = TUseQuery extends QueryStateSelector<infer _R, infer _D>
    ? Parameters<TUseQuery>[0]
    : never;

type Result<D extends QueryDefinition<any, any, any, any>> = UseQueryStateDefaultResult<QueryStateSelector<Record<string, unknown>, D>>;

export const mapReduxQueryToTask = <D extends QueryDefinition<any, any, any, any>>(
    result: Result<D>
): Task<ResultTypeFrom<D>> => {
    if (!result || result.isUninitialized) return task();
    if (!result.data && result.isLoading) runningTask();
    if (result.error) return faultedTask(mapReduxErrorToFault(result.error));
    return result.data === undefined
        ? completedTask()
        : resultedTask(result.data);
};
