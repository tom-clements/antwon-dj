import type { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { RoomSettingsMenu } from 'room/components/RoomSettingsMenu';
import { UseGoBackAction, useGoBackAction as _useGoBackAction } from 'common/hooks/useGoBackAction';
import { UseRoomSettingActions, useRoomSettingActions as _useRoomSettingActions } from 'room/hooks/useRoomSettingActions';

interface Props {
    /**
     * Injected `useGoBackAction` hook or default implementation
     */
    useGoBackAction?: UseGoBackAction;

    /**
     * Injected `useRoomSettingActions` hook or default implementation
     */
    useRoomSettingActions?: UseRoomSettingActions;
}

export const RoomSettings: FC<Props> = props => {
    const useGoBackAction = props.useGoBackAction ?? _useGoBackAction;
    const goBack = useGoBackAction();

    const useRoomSettingActions = props.useRoomSettingActions ?? _useRoomSettingActions;
    const actions = useRoomSettingActions();

    return (
        <SettingsView title="Room Settings" onGoBack={goBack}>
            <RoomSettingsMenu actions={actions} />
        </SettingsView>
    );
};
