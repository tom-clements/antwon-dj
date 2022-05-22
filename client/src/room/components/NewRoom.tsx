import { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { ControlContainer } from 'common/components/ControlContainer';
import { RoomCodeForm } from 'room/components/RoomCodeForm';
import { UseGoBackAction, useGoBackAction as _useGoBackAction } from 'common/hooks/useGoBackAction';
import { UseNewRoom, useNewRoom as _useNewRoom } from 'room/hooks/useNewRoom';

interface Props {
    /**
     * Injected `useGoBackAction` hook or default implementation
     */
    useGoBackAction?: UseGoBackAction;

    /**
     * Injected `useNewRoom` hook or default implementation
     */
    useNewRoom?: UseNewRoom;
}

export const NewRoom: FC<Props> = props => {
    // TODO Convert this and all injected hooks to { name = _default } syntax for brevity
    const useGoBackAction = props.useGoBackAction ?? _useGoBackAction;
    const goBack = useGoBackAction();

    const useRoomPortal = props.useNewRoom ?? _useNewRoom;
    const {
        createAndGoToNewRoom,
    } = useRoomPortal();

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
