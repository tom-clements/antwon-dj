import type { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { RoomSettingsMenu } from 'room/components/RoomSettingsMenu';
import { useDependencies } from 'common/hooks/useDependencies';

export const RoomSettings: FC = () => {
    const useBreadcrumbs = useDependencies(d => d.useBreadcrumbs);
    const { goBack } = useBreadcrumbs();

    const useRoomSettingActions = useDependencies(d => d.useRoomSettingActions);
    const actions = useRoomSettingActions();

    return (
        <SettingsView title="Room Settings" onGoBack={goBack}>
            <RoomSettingsMenu actions={actions} />
        </SettingsView>
    );
};
