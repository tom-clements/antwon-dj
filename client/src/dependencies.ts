import { useAccountLinks } from 'user/hooks/useAccountLinks';
import { useBreadcrumbs } from 'common/hooks/useBreadcrumbs';
import { useDarkMode } from 'styles/hooks/useDarkMode';
import { useRoomPortal } from 'room/hooks/useRoomPortal';
import { useRoomPortalButtons } from 'room/hooks/useRoomPortalButtons';
import { useRoomSettingActions } from 'room/hooks/useRoomSettingActions';
import { useNewRoom } from 'room/hooks/useNewRoom';
import { useUser } from 'user/hooks/useUser';
import { useUserMenuClickActions } from 'user/hooks/useUserMenuClickActions';

export const dependencies = {
    useAccountLinks,
    useBreadcrumbs,
    useDarkMode,
    useRoomPortal,
    useRoomPortalButtons,
    useRoomSettingActions,
    useNewRoom,
    useUser,
    useUserMenuClickActions,
};
