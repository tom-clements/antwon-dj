import { ComponentStory } from '@storybook/react';
import { RoomCodeForm } from 'room/components/RoomCodeForm';

export default {
    title: 'room/RoomCodeForm',
    component: RoomCodeForm,
    argTypes: {
        initialRoomCode: { control: { type: 'text' } },
        onChange: { control: { disable: true } },
        onSubmit: { control: { disable: true } },
    },
    args: {
        submitText: 'GO',
    },
};

const Template: ComponentStory<typeof RoomCodeForm> = args => (
    <RoomCodeForm {...args} />
);

export const Default = {
    ...Template.bind({}),
    argTypes: {
        roomCode: { control: { disable: true } },
    }
};

export const InitialValue = {
    ...Template.bind({}),
    args: {
        initialRoomCode: 'INIT00'
    },
};
