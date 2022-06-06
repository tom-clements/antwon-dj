import React from 'react';
import { ComponentStory } from '@storybook/react';
import { QueueSong } from 'room/components/QueueSong';

export default {
    title: 'room/QueueSong',
    component: QueueSong
};

export const QueueSongStory: ComponentStory<typeof QueueSong> = args => (
    <div>
        <QueueSong {...args} />
    </div>
);
QueueSongStory.argTypes = {
    albumUrl: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    artist: { control: { type: 'text' } },
    isLoggedIn: { control: { type: 'boolean' } },
    isRoomOwner: { control: { type: 'boolean' } }
};
QueueSongStory.args = {
    title: 'The Bop',
    artist: 'Taylor',
    albumUrl: 'https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png',
    isLoggedIn: true,
    isRoomOwner: false
};
