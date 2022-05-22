import type { UserModel } from 'user/model/UserModel';

export const isLoggedIn = (user: UserModel | null): user is UserModel => {
    return !!user;
};
