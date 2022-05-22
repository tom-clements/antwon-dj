import type { HF } from 'common/model/HookFunction';
import { UserModel } from 'user/model/UserModel';

export type UseUser = HF<void, UserModel | null>;

export const useUser: UseUser = () => {
    return null;
};
