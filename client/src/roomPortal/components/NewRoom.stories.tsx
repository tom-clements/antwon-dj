import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import type { Dependencies } from 'common/services/DependencyContext';
import { DependencyProvider } from 'common/components/DependencyProvider';
import { NewRoom as NewRoomComponent } from 'roomPortal/components/NewRoom';
import { mockUseRouter } from 'tests/common/hooks/useRouter.mock';

export default {
    title: 'room/NewRoom',
    component: NewRoomComponent,
    args: {
        useRouter: mockUseRouter(),
        useNewRoom: () => ({
            createAndGoToNewRoom: () => undefined,
        }),
    },
    argTypes: {
        useRouter: { control: false },
        useNewRoom: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const Template: Story<ComponentProps<typeof NewRoomComponent> & Partial<Dependencies>> = args => (
    <DependencyProvider {...args}>
        <NewRoomComponent {...args} />
    </DependencyProvider>
);

export const Default = Template.bind({});
