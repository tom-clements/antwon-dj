import type { Fault } from 'common/model/Fault';
import { Task, TaskStatus } from 'common/model/Task';
import { isFaultedTask, isResultedTask } from 'common/predicates/isTask';

export const taskAddRunning = <T>(task: Task<T>): Task<T> => {
    task.status |= TaskStatus.Running;
    return task;
};

export const taskRemoveRunning = <T>(task: Task<T>): Task<T> => {
    task.status &= ~TaskStatus.Running;
    return task;
};

export const taskAddFaulted = <T>(task: Task<T>, fault: Fault): Task<T> => {
    task.status |= TaskStatus.Faulted;
    (task as any).fault = fault;
    return task;
};

export const taskRemoveFaulted = <T>(task: Task<T>): Task<T> => {
    task.status &= ~TaskStatus.Faulted;
    if (isFaultedTask(task)) delete (task as any).fault;
    return task;
};

export const taskAddCompleted = <T>(task: Task<T>): Task<T> => {
    task.status |= TaskStatus.Completed;
    return task;
};

export const taskRemoveCompleted = <T>(task: Task<T>): Task<T> => {
    task.status &= ~TaskStatus.Completed;
    return task;
};

export const taskAddResulted = <T>(task: Task<T>, result: T): Task<T> => {
    task.status |= TaskStatus.Resulted;
    (task as any).result = result;
    return task;
};

export const taskRemoveResulted = <T>(task: Task<T>): Task<T> => {
    task.status &= ~TaskStatus.Resulted;
    if (isResultedTask(task)) delete (task as any).result;
    return task;
};
