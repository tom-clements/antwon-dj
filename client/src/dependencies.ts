import { useAccountLinks } from 'user/hooks/useAccountLinks';
import { useBreadcrumbs } from 'common/hooks/useBreadcrumbs';
import { useDarkMode } from 'styles/hooks/useDarkMode';
import { useFaultLogging } from 'common/hooks/useFaultLogging';
import { useLoginLoop } from 'user/hooks/useLoginLoop';
import { useLogoutLoop } from 'user/hooks/useLogoutLoop';
import { useParameterFromRouter } from 'common/hooks/useParameterFromRouter';
import { useRoom } from 'room/hooks/useRoom';
import { useRoomId } from 'room/hooks/useRoomId';
import { useRoomPortal } from 'roomPortal/hooks/useRoomPortal';
import { useRoomPortalButtons } from 'roomPortal/hooks/useRoomPortalButtons';
import { useRoomSettingActions } from 'roomPortal/hooks/useRoomSettingActions';
import { useRouter } from 'common/hooks/useRouter';
import { useNewRoom } from 'roomPortal/hooks/useNewRoom';
import { useNowPlaying } from 'room/hooks/useNowPlaying';
import { useSong } from 'room/hooks/useSong';
import { useSongQueue } from 'room/hooks/useSongQueue';
import { useToastErrorRedirect } from 'toastError/hooks/useToastErrorRedirect';
import { useUser } from 'user/hooks/useUser';
import { useUserClaims } from 'user/hooks/useUserClaims';
import { useUserMenuClickActions } from 'user/hooks/useUserMenuClickActions';

export const dependencies = {
    useAccountLinks,
    useBreadcrumbs,
    useDarkMode,
    useFaultLogging,
    useLoginLoop,
    useLogoutLoop,
    useParameterFromRouter,
    useRoom,
    useRoomId,
    useRoomPortal,
    useRoomPortalButtons,
    useRoomSettingActions,
    useRouter,
    useNewRoom,
    useNowPlaying,
    useSong,
    useSongQueue,
    useToastErrorRedirect,
    useUser,
    useUserClaims,
    useUserMenuClickActions,
};
