import { createMockUserModels } from 'tests/user/helpers/createMockUserModels';
import { UserModel } from 'user/model/UserModel';

export const mapMockUsersToUseUsers = (userModels: ReturnType<typeof createMockUserModels>) => {
    type UseUsers = Record<keyof typeof userModels, () => UserModel>;

    return Object.keys(userModels).reduce<UseUsers>((result, key) => {
        result[key] = () => userModels[key];
        return result;
    }, {});
};
