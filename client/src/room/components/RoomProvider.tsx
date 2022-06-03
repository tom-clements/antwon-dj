import { FC } from 'react';
import { useDependencies } from 'common/hooks/useDependencies';
import { TaskStatus } from 'common/model/Task';
import { DeferredTask } from 'common/components/DeferredTask';

interface Props {
    initialRoomCode: string;
    render: (roomId: string) => JSX.Element;
    renderLoading: () => JSX.Element;
}

export const RoomProvider: FC<Props> = props => {
    const task = useDependencies(d => d.useRoom)(props);
    return (
        <DeferredTask task={task}>
            {{
                [TaskStatus.Resulted]: data => props.render(data),
                [TaskStatus.Completed]: () => props.renderLoading(),
                [TaskStatus.Created]: () => props.renderLoading(),
            }}
        </DeferredTask>
    );
};
