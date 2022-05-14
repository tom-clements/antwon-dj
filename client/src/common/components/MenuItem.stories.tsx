import { ComponentStory } from '@storybook/react';
import { MenuItem as MenuItemComponent } from 'common/components/MenuItem';
import { Login, Logout, Share, ArrowBack, Settings, Chair } from '@mui/icons-material';
import { MenuItemPadding } from 'common/model/MenuItemPadding';
import { getEnumKeyValueMap } from 'common/helpers/getEnumKeyMap';

const iconOptionMapping = {
    default: undefined,
    login: Login,
    logout: Logout,
    share: Share,
    arrowBack: ArrowBack,
    settings: Settings,
    chair: Chair,
};

const paddingOptionMapping = getEnumKeyValueMap(MenuItemPadding);

export default {
    title: 'common/MenuItem',
    component: MenuItemComponent,
    args: {
        text: 'Menu item',
        icon: Object.keys(iconOptionMapping)[0],
        padding: Object.keys(paddingOptionMapping)[0],
    },
    argTypes: {
        onClick: { control: false },
        icon: {
            options: Object.keys(iconOptionMapping),
            mapping: iconOptionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(iconOptionMapping) }
            },
        },
        padding: {
            options: Object.keys(paddingOptionMapping),
            mapping: paddingOptionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(paddingOptionMapping) }
            },
        },
        className: { control: false },
        style: { control: false },
    },
};

const Template: ComponentStory<typeof MenuItemComponent> = args => (
    <MenuItemComponent {...args} />
);

export const Default = {
    ...Template.bind({}),
};
