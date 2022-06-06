import type { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { RoomSettingsMenu } from 'roomPortal/components/RoomSettingsMenu';
import { useDependencies } from 'common/hooks/useDependencies';

export const RoomSettings: FC = () => {
    const { goBack } = useDependencies(d => d.useRouter)();
    const actions = useDependencies(d => d.useRoomSettingActions)();

    return (
        <SettingsView title="Room Settings" onGoBack={goBack}>
            <RoomSettingsMenu actions={actions} />
        </SettingsView>
    );
};
