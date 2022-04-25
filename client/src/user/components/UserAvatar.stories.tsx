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

const users = {
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
        user: users.withImage,
    },
    argTypes: {
        user: {
            options: Object.keys(users),
            mapping: users,
            control: {
                type: 'select',
                labels: {
                    withImage: 'With image',
                    withoutImage: 'Without image',
                },
            },
        }
    }
};
