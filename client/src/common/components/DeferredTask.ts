import { mapTask } from 'common/mappers/mapTask';
import type { Task } from 'common/model/Task';
import { TaskMap } from 'common/model/TaskMap';

type Props<T> = {
    task: Task<T>;
    children: TaskMap<JSX.Element, T>
};

export const DeferredTask = <T>(props: Props<T>) => {
    const { task, children } = props;
    return mapTask(task, children);
};
