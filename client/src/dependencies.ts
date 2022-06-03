import { useAccountLinks } from 'user/hooks/useAccountLinks';
import { useBreadcrumbs } from 'common/hooks/useBreadcrumbs';
import { useDarkMode } from 'styles/hooks/useDarkMode';
import { useRoomPortal } from 'roomPortal/hooks/useRoomPortal';
import { useRoomPortalButtons } from 'roomPortal/hooks/useRoomPortalButtons';
import { useRoomSettingActions } from 'roomPortal/hooks/useRoomSettingActions';
import { useNewRoom } from 'roomPortal/hooks/useNewRoom';
import { useSongQueue } from 'room/hooks/useSongQueue';
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
    useSongQueue,
    useUser,
    useUserMenuClickActions,
};
