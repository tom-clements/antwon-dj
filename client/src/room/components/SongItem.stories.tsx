import React from 'react';
import { ComponentStory } from '@storybook/react';
import { SongItem } from './SongItem';

export default {
    title: 'room/SongItem',
    component: SongItem
};

export const SongItemStory: ComponentStory<typeof SongItem> = args => (
    <div>
        <SongItem {...args} />
    </div>
);
SongItemStory.argTypes = {
    style: { control: { type: '' } },
    albumUrl: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    artist: { control: { type: 'text' } },
    isLoggedIn: { control: { type: 'boolean' } },
    isRoomOwner: { control: { type: 'boolean' } }
};
SongItemStory.args = {
    title: 'The Bop',
    artist: 'Taylor',
    albumUrl: 'https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png',
    isLoggedIn: true,
    isRoomOwner: false
};
