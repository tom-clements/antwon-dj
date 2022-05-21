import { ComponentStory } from '@storybook/react';
import { DarkModeMenuItem as DarkModeMenuItemComponent } from 'styles/components/DarkModeMenuItem';

export default {
    title: 'styles/DarkModeMenuItem',
    component: DarkModeMenuItemComponent,
    argTypes: {
        useDarkMode: { control: false },
    },
};

const Template: ComponentStory<typeof DarkModeMenuItemComponent> = args => (
    <DarkModeMenuItemComponent {...args} />
);

export const Default = {
    ...Template.bind({}),
};
