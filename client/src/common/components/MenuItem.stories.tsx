import { ComponentStory } from '@storybook/react';
import { MenuItem as MenuItemComponent } from 'common/components/MenuItem';
import { Login, Logout, Share, ArrowBack, Settings, Chair } from '@mui/icons-material';

const optionMapping = {
    default: undefined,
    login: Login,
    logout: Logout,
    share: Share,
    arrowBack: ArrowBack,
    settings: Settings,
    chair: Chair,
};

export default {
    title: 'common/MenuItem',
    component: MenuItemComponent,
    args: {
        text: 'Menu item',
        icon: Object.keys(optionMapping)[0],
    },
    argTypes: {
        icon: {
            options: Object.keys(optionMapping),
            mapping: optionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(optionMapping) }
            },
        },
        onClick: { control: false },
    },
};

const Template: ComponentStory<typeof MenuItemComponent> = args => (
    <MenuItemComponent {...args} />
);

export const Default = {
    ...Template.bind({}),
};
