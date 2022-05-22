import { ComponentStory } from '@storybook/react';
import { createMockUserModels } from 'tests/user/helpers/createMockUserModels';
import { mapMockUsersToUseUsers } from 'tests/user/helpers/mapMockUsersToUseUsers';
import { UserPopoverMenu as UserPopoverMenuComponent } from 'user/components/UserPopoverMenu';

const users = createMockUserModels();
const useUserOptionMapping = mapMockUsersToUseUsers(users);

export default {
    title: 'user/UserPopoverMenu',
    component: UserPopoverMenuComponent,
    args: {
        useUser: Object.keys(useUserOptionMapping)[1],
        useUserMenuClickActions: () => ({
            myRoom: () => undefined,
            roomSettings: () => undefined,
            shareRoom: () => undefined,
            back: () => undefined,
            login: () => undefined,
            logout: () => undefined,
        }),
    },
    argTypes: {
        useUser: {
            options: Object.keys(useUserOptionMapping),
            mapping: useUserOptionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(useUserOptionMapping) }
            },
        },
        useUserMenuClickActions: { control: false },
        useDarkMode: { control: false },
    },
};

const Template: ComponentStory<typeof UserPopoverMenuComponent> = args => (
    <UserPopoverMenuComponent {...args} />
);

export const Default = Template.bind({});
