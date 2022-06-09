import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import type { Dependencies } from 'common/services/DependencyContext';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { RoomPortalButtons as RoomPortalButtonsComponent } from 'roomPortal/components/RoomPortalButtons';
import { createMockUserModels } from 'tests/user/helpers/createMockUserModels';
import { mapMockUsersToUseUsers } from 'tests/user/helpers/mapMockUsersToUseUsers';

const users = createMockUserModels();
const useUserOptionMapping = mapMockUsersToUseUsers(users);

export default {
    title: 'room/RoomPortalButtons',
    component: RoomPortalButtonsComponent,
    args: {
        useUser: Object.keys(useUserOptionMapping)[0],
        useRoomPortalButtons: () => ({
            newRoom: () => undefined,
            myRoom: () => undefined,
            linkAccounts: () => undefined,
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
        useRoomPortalButtons: { control: false },
    },
};

const Template: Story<ComponentProps<typeof RoomPortalButtonsComponent> & Partial<Dependencies>> = args => (
    <DependencyProvider {...args}>
        <RoomPortalButtonsComponent {...args} />
    </DependencyProvider>
);

export const Default = Template.bind({});
