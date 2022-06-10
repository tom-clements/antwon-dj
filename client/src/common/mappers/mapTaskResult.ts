import type { Task } from 'common/model/Task';
import { isResultedTask } from 'common/predicates/isTask';

export const mapTaskResult = <T, R>(task: Task<T>, mapper: (value: T) => R): Task<R> => {
    if (!isResultedTask(task)) return task;
    return {
        ...task,
        result: mapper(task.result)
    };
};
