import type { HF } from 'common/model/HookFunction';
import { UserClaimsModel } from 'user/model/UserClaimsModel';
import { useRoomId } from 'room/hooks/useRoomId';
import { useUser } from 'user/hooks/useUser';
import { isLoggedIn } from 'user/predicates/isLoggedIn';
import { isResultedTask } from 'common/predicates/isTask';

export type UseUserClaims = HF<void, UserClaimsModel>;

export const useUserClaims: UseUserClaims = () => {
    const roomTask = useRoomId({});
    const user = useUser();

    if (!isLoggedIn(user)) return {
        isLoggedIn: false,
        isRoomOwner: false,
    };

    const room = isResultedTask(roomTask) ? roomTask.result : null;

    return {
        isLoggedIn: true,
        isRoomOwner: room?.code === user.roomCode,
    };
};
