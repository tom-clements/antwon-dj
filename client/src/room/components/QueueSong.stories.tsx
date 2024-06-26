import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import { QueueSong } from 'room/components/QueueSong';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { mockUseSong } from 'tests/room/hooks/useSong.mock';

export default {
    title: 'room/QueueSong',
    component: QueueSong,
    args: {
        useSongActions: mockUseSong(),
    },
};

const Template: Story<ComponentProps<typeof QueueSong>> = args => (
    <DependencyProvider {...args}>
        <div style={{ minWidth: '300px' }}>
            <QueueSong {...args} />
        </div>
    </DependencyProvider>
);

export const Default = Template.bind({});
Default.argTypes = {
    albumUrl: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    artist: { control: { type: 'text' } },
};
Default.args = {
    title: 'The Bop',
    artist: 'Taylor',
    albumUrl: 'https://www.pngkey.com/png/detail/15-159637_black-box-with-question-mark-png.png',
};
