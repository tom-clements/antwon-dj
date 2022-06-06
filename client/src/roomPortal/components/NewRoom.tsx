import { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { ControlContainer } from 'common/components/ControlContainer';
import { RoomCodeForm } from 'roomPortal/components/RoomCodeForm';
import { useDependencies } from 'common/hooks/useDependencies';

export const NewRoom: FC = () => {
    const { goBack } = useDependencies(d => d.useRouter)();
    const { createAndGoToNewRoom } = useDependencies(d => d.useNewRoom)();

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
