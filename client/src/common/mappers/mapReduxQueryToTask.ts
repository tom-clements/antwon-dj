import { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { ResultTypeFrom } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { QueryStateSelector } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { mapReduxErrorToFault } from 'common/mappers/mapReduxErrorToFault';
import { task, Task } from 'common/model/Task';
import { taskAddFaulted, taskAddResulted, taskAddRunning } from 'room/services/taskExtensions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UseQueryStateDefaultResult<TUseQuery> = TUseQuery extends QueryStateSelector<infer _R, infer _D>
    ? Parameters<TUseQuery>[0]
    : never;

type Result<D extends QueryDefinition<any, any, any, any>> = UseQueryStateDefaultResult<QueryStateSelector<Record<string, unknown>, D>>;

export const mapReduxQueryToTask = <D extends QueryDefinition<any, any, any, any>>(
    result: Result<D>
): Task<ResultTypeFrom<D>> => {
    const mappedTask = task();
    if (!result || result.isUninitialized) return mappedTask;
    if (result.isLoading || result.isFetching) taskAddRunning(mappedTask);
    if (result.error) taskAddFaulted(mappedTask, mapReduxErrorToFault(result.error));
    if (result.data) taskAddResulted(mappedTask, result.data);
    return mappedTask;
};
