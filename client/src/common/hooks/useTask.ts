import type { HF } from 'common/model/HookFunction';
import { mapErrorToFault } from 'common/mappers/mapErrorToFault';
import { fault } from 'common/model/Fault';
import { faultedTask, Task } from 'common/model/Task';

export type UseTask<T> = HF<() => Task<T>, Task<T>>;

export const useTask = <T>(task: () => Task<T>) => {
    try {
        return task();
    } catch (error: unknown) {
        return faultedTask(error instanceof Error
            ? mapErrorToFault(error)
            : fault());
    }
};

export type UseAsyncTask<T> = HF<Promise<Task<T>>, Task<T>>;

export const useAsyncTask = async <T>(taskPromise: Promise<Task<T>>) => {
    try {
        return await taskPromise;
    } catch (error: unknown) {
        return faultedTask(error instanceof Error
            ? mapErrorToFault(error)
            : fault());
    }
};
