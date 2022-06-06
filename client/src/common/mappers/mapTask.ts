import { Task, TaskStatus } from 'common/model/Task';
import type { TaskMap } from 'common/model/TaskMap';
import { isCreatedTask, isRunningTask, isFaultedTask, isCompletedTask, isResultedTask } from 'common/predicates/isTask';

export const mapTask = <TMapResult, T>(
    task: Task<T>,
    mapper: TaskMap<TMapResult, T>
): TMapResult | null => {
    if (isResultedTask(task)) return mapper[TaskStatus.Resulted]?.(task.result) ?? null;
    if (isCompletedTask(task)) return mapper[TaskStatus.Completed]() ?? null;
    if (isFaultedTask(task)) return mapper[TaskStatus.Faulted]?.(task.fault) ?? null;
    if (isRunningTask(task)) return mapper[TaskStatus.Running]?.() ?? null;
    if (isCreatedTask(task)) return mapper[TaskStatus.Created]() ?? null;
    throw new Error('Could not map task');
};
