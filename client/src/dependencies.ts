import { useRoomPortalButtons } from 'room/hooks/useRoomPortalButtons';
import { useDarkMode } from 'styles/hooks/useDarkMode';
import { useUser } from 'user/hooks/useUser';
import { useUserMenuClickActions } from 'user/hooks/useUserMenuClickActions';

export const dependencies = {
    useDarkMode,
    useRoomPortalButtons,
    useUser,
    useUserMenuClickActions,
};
