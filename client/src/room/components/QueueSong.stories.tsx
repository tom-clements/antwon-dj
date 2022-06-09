import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import { QueueSong } from 'room/components/QueueSong';

export default {
    title: 'room/QueueSong',
    component: QueueSong
};

const Template: Story<ComponentProps<typeof QueueSong>> = args => (
    <div style={{ minWidth: '300px' }}>
        <QueueSong {...args} />
    </div>
);

export const Default = Template.bind({});
Default.argTypes = {
    albumUrl: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    artist: { control: { type: 'text' } },
    isLoggedIn: { control: { type: 'boolean' } },
    isRoomOwner: { control: { type: 'boolean' } }
};
Default.args = {
    title: 'The Bop',
    artist: 'Taylor',
    albumUrl: 'https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png',
    isLoggedIn: true,
    isRoomOwner: false
};
