import { ComponentStory } from '@storybook/react';
import { RoomCodeInput } from 'room/components/RoomCodeInput';

export default {
    title: 'room/RoomCodeInput',
    component: RoomCodeInput,
    argTypes: {
        roomCode: { control: { type: 'text' } },
        onChange: { control: { disable: true } },
    },
};

const Template: ComponentStory<typeof RoomCodeInput> = args => {
    return (
        <RoomCodeInput {...args} />
    );
};

export const Default = {
    ...Template.bind({}),
    args: {
        roomCode: 'SOIREE',
    }
};
