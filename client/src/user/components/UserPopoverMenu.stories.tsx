import { ComponentStory } from '@storybook/react';
import { UserPopoverMenu as UserPopoverMenuComponent } from 'user/components/UserPopoverMenu';

export default {
    title: 'user/UserPopoverMenu',
    component: UserPopoverMenuComponent,
    argTypes: {
        user: { control: false },
        onClick: { control: false },
    },
};

const Template: ComponentStory<typeof UserPopoverMenuComponent> = args => (
    <UserPopoverMenuComponent {...args} />
);

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    user: null
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {
        name: 'Ablert Clements'
    }
};
