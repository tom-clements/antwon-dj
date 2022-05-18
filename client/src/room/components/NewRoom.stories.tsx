import { ComponentStory } from '@storybook/react';
import { NewRoom as NewRoomComponent } from 'room/components/NewRoom';

export default {
    title: 'room/NewRoom',
    component: NewRoomComponent,
    args: {
        useGoBackAction: () => () => undefined,
        useNewRoom: () => ({
            createAndGoToNewRoom: () => undefined,
        }),
    },
    argTypes: {
        useGoBackAction: { control: false },
        useNewRoom: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const Template: ComponentStory<typeof NewRoomComponent> = args => (
    <NewRoomComponent {...args} />
);

export const Default = {
    ...Template.bind({}),
};
