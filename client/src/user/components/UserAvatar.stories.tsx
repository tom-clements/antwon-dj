import { ComponentStory } from '@storybook/react';
import { UserAvatar as UserAvatarComponent } from 'user/components/UserAvatar';
import { createMockUserModels } from 'tests/user/helpers/createMockUserModels';

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

const optionMapping = createMockUserModels();

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
