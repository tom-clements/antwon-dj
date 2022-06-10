import type { Fault } from 'common/model/Fault';

/**
 * Enumeration of valid task states.
 * In theory, tasks may be in multiple states.
 * E.g., Task.Completed | Task.Result.
 */
export const enum TaskStatus {
    // Base states

    /**
     * The task has been initialized and not yet started
     */
    Created   = 0b0000, // 0

    /**
     * The task is currently running or waiting
     */
    Running   = 0b0001, // 1

    /**
     * The task encountered an error
     */
    Faulted   = 0b0010, // 2

    /**
     * The task has completed
     */
    Completed = 0b0100, // 4

    /**
     * The task has returned a result
     */
    Resulted  = 0b1000, // 8
}

export type CreatedTask = {
    status: TaskStatus.Created;
};

export type RunningTask = {
    status: TaskStatus.Created | TaskStatus.Running;
};

export type FaultedTask = {
    status: TaskStatus.Created | TaskStatus.Faulted;
    fault: Fault;
};

export type CompletedTask = {
    status: TaskStatus.Created | TaskStatus.Completed
};

export type ResultedTask<T> = {
    status: TaskStatus.Created | TaskStatus.Completed | TaskStatus.Resulted;
    result: T;
};

export type Task<T = unknown> = (
    CreatedTask |
    RunningTask |
    FaultedTask |
    CompletedTask |
    ResultedTask<T>);

export const task = (): CreatedTask => ({ 
    status: TaskStatus.Created,
});

export const runningTask = (): RunningTask => ({
    status: TaskStatus.Created | TaskStatus.Running,
});

export const faultedTask = (fault: Fault): FaultedTask => ({
    status: TaskStatus.Created | TaskStatus.Faulted,
    fault,
});

export const completedTask = (): CompletedTask => ({
    status: TaskStatus.Created | TaskStatus.Completed,
});

export const resultedTask = <T>(result: T): ResultedTask<T> => ({
    status: TaskStatus.Created | TaskStatus.Completed | TaskStatus.Resulted,
    result,
});
