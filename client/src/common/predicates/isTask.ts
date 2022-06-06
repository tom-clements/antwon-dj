import { CompletedTask, CreatedTask, FaultedTask, ResultedTask, RunningTask, Task, TaskStatus } from 'common/model/Task';

export const isCreatedTask = (task: Task): task is CreatedTask =>
    (task.status & TaskStatus.Created) === TaskStatus.Created;

export const isRunningTask = (task: Task): task is RunningTask =>
    (task.status & TaskStatus.Running) === TaskStatus.Running;

export const isFaultedTask = (task: Task): task is FaultedTask =>
    (task.status & TaskStatus.Faulted) === TaskStatus.Faulted;

export const isCompletedTask = (task: Task): task is CompletedTask =>
    (task.status & TaskStatus.Completed) === TaskStatus.Completed;

export const isResultedTask = <T>(task: Task<T>): task is ResultedTask<T> =>
    (task.status & TaskStatus.Resulted) === TaskStatus.Resulted;
