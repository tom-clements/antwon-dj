import { ComponentStory } from '@storybook/react';
import { UserAvatar as UserAvatarComponent } from 'user/components/UserAvatar';

export default {
    title: 'user/UserAvatar',
    component: UserAvatarComponent,
};

const Template: ComponentStory<typeof UserAvatarComponent> = args => (
    <UserAvatarComponent {...args} />
);

export const LoggedOut = {
    ...Template.bind({}),
    args: {
        user: null,
    },
    argTypes: {
        user: { control: false },
    }
};

const optionMapping = {
    withImage: {
        name: 'Ablert Clements',
        imageUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    withoutImage: {
        name: 'Ablert Clements',
    },
};

export const LoggedIn = {
    ...Template.bind({}),
    args: {
        user: Object.keys(optionMapping)[0],
    },
    argTypes: {
        user: {
            options: Object.keys(optionMapping),
            mapping: optionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(optionMapping) }
            },
        }
    }
};
