import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import type { Dependencies } from 'common/services/DependencyContext';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { RoomSettings as RoomSettingsComponent } from 'roomPortal/components/RoomSettings';
import { mockUseRouter } from 'tests/common/hooks/useRouter.mock';

export default {
    title: 'room/RoomSettings',
    component: RoomSettingsComponent,
    args: {
        useRouter: mockUseRouter(),
        useRoomSettingActions: () => ({
            clearQueue: () => undefined,
            deleteRoom: () => undefined,
        }),
    },
    argTypes: {
        useRouter: { control: false },
        useRoomSettingActions: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const Template: Story<ComponentProps<typeof RoomSettingsComponent> & Partial<Dependencies>> = args => (
    <DependencyProvider {...args}>
        <RoomSettingsComponent {...args} />
    </DependencyProvider>
);

export const Default = Template.bind({});
