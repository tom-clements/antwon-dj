import type { Fault } from 'common/model/Fault';
import { TaskStatus } from 'common/model/Task';

/**
 * Higher state values take precedence
 */
export type TaskMap<TMapResult, T> = {
    [TaskStatus.Resulted]?: (result: T) => TMapResult;
    [TaskStatus.Completed]: () => TMapResult;
    [TaskStatus.Faulted]?: (fault: Fault) => TMapResult;
    [TaskStatus.Running]?: () => TMapResult;
    [TaskStatus.Created]: () => TMapResult;
};
