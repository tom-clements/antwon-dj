import type { HF } from 'common/model/HookFunction';
import { UserModel } from 'user/model/UserModel';
import { userApi } from 'user/services/userApi';
import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import { isResultedTask } from 'common/predicates/isTask';
import { mapUserFromDto } from 'user/mappers/mapUserFromDto';

export type UseUser = HF<void, UserModel | null>;

export const useUser: UseUser = () => {
    const query = userApi.endpoints.user.useQueryState();
    const task = mapReduxQueryToTask(query);

    if (!isResultedTask(task)) return null;

    return mapUserFromDto(task.result);
};
