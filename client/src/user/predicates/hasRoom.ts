import type { UserModel } from 'user/model/UserModel';

export const hasRoom = (user: UserModel | null): user is UserModel => {
    return !!user?.roomId;
};
