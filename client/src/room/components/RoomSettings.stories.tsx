import { ComponentStory } from '@storybook/react';
import { RoomSettings as RoomSettingsComponent } from 'room/components/RoomSettings';

export default {
    title: 'room/RoomSettings',
    component: RoomSettingsComponent,
    args: {
        useGoBackAction: () => () => undefined,
        useRoomSettingActions: () => ({
            clearQueue: () => undefined,
            deleteRoom: () => undefined,
        }),
    },
    argTypes: {
        useGoBackAction: { control: false },
        useRoomSettingActions: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const Template: ComponentStory<typeof RoomSettingsComponent> = args => (
    <RoomSettingsComponent {...args} />
);

export const Default = {
    ...Template.bind({}),
};
