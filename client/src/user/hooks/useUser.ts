import type { HF } from 'common/model/HookFunction';
import { UserModel } from 'user/model/UserModel';
import { useSelector } from 'common/services/createStore';
import { selectUser } from 'user/services/authSlice';

export type UseUser = HF<void, UserModel | null>;

export const useUser: UseUser = () => {
    const user = useSelector(selectUser);
    return user;
};
