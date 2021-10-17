import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { RoomCodeInput } from 'components/roomPortal/RoomCodeInput';

export default {
    title: 'room/RoomCodeInput',
    component: RoomCodeInput,
    argTypes: {
        roomCode: { table: { disable: true } },
        onChange: { table: { disable: true } },
    },
};

export const Default: Story = () => {
    const [roomCode, setRoomCode] = useState<string | null>(null);
    return (
        <RoomCodeInput roomCode={roomCode} onChange={setRoomCode} />
    );
};

Default.parameters = {
    controls: { hideNoControlsWarning: true },
};
