import { ComponentStory } from '@storybook/react';
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

const Template: ComponentStory<typeof RoomPortalButtonsComponent> = args => (
    <RoomPortalButtonsComponent {...args} />
);

export const Default = {
    ...Template.bind({}),
};
