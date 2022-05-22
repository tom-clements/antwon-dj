import { useDarkMode } from 'styles/hooks/useDarkMode';
import { useRoomPortal } from 'room/hooks/useRoomPortal';
import { useRoomPortalButtons } from 'room/hooks/useRoomPortalButtons';
import { useUser } from 'user/hooks/useUser';
import { useUserMenuClickActions } from 'user/hooks/useUserMenuClickActions';

export const dependencies = {
    useDarkMode,
    useRoomPortal,
    useRoomPortalButtons,
    useUser,
    useUserMenuClickActions,
};
