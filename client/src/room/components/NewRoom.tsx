import { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { ControlContainer } from 'common/components/ControlContainer';
import { RoomCodeForm } from 'room/components/RoomCodeForm';
import { useDependencies } from 'common/hooks/useDependencies';

export const NewRoom: FC = () => {
    const useBreadcrumbs = useDependencies(d => d.useBreadcrumbs);
    const { goBack } = useBreadcrumbs();

    const {
        createAndGoToNewRoom,
    } = useDependencies(d => d.useNewRoom)();

    return (
        <SettingsView title="New Room" onGoBack={goBack}>
            <ControlContainer>
                <RoomCodeForm
                    initialRoomCode={null}
                    onSubmit={createAndGoToNewRoom}
                    submitText="Create"
                />
            </ControlContainer>
        </SettingsView>
    );
};
