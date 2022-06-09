import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import type { Dependencies } from 'common/services/DependencyContext';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { UserPopoverMenu as UserPopoverMenuComponent } from 'user/components/UserPopoverMenu';
import { createMockUserModels } from 'tests/user/helpers/createMockUserModels';
import { mapMockUsersToUseUsers } from 'tests/user/helpers/mapMockUsersToUseUsers';

const users = createMockUserModels();
const useUserOptionMapping = mapMockUsersToUseUsers(users);

export default {
    title: 'user/UserPopoverMenu',
    component: UserPopoverMenuComponent,
    args: {
        useRouter: () => ({
            isHome: false,
            goBack: () => undefined,
            goTo: () => undefined,
            goToExternal: () => undefined,
        }),
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

const Template: Story<ComponentProps<typeof UserPopoverMenuComponent> & Partial<Dependencies>> = args => (
    <DependencyProvider {...args}>
        <UserPopoverMenuComponent {...args} />
    </DependencyProvider>
);

export const Default = Template.bind({});
