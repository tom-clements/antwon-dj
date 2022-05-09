import { ComponentStory } from '@storybook/react';
import { LinkAccounts as LinkAccountsComponent } from 'user/components/LinkAccounts';
import { LinkAccountsMenu } from 'user/components/LinkAccountsMenu';
import { LinkAccountItem } from 'user/components/LinkAccountItem';
import { mockAccountLinksFactory } from 'tests/user/helpers/mockAccountLinksFactory';

const optionMapping = {
    linked: mockAccountLinksFactory(true),
    unlinked: mockAccountLinksFactory(false),
};

export default {
    title: 'user/LinkAccounts',
    component: LinkAccountsComponent,
    subcomponents: { LinkAccountsMenu, LinkAccountItem },
    args: {
        useGoBackAction: () => () => undefined,
    },
    argTypes: {
        useAccountLinks: {
            options: Object.keys(optionMapping),
            mapping: optionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(optionMapping) }
            },
        },
        useGoBackAction: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const Template: ComponentStory<typeof LinkAccountsComponent> = args => (
    <LinkAccountsComponent {...args} />
);

export const Linked = {
    ...Template.bind({}),
    args: {
        useAccountLinks: Object.keys(optionMapping)[0],
    },
};

export const Unlinked = {
    ...Template.bind({}),
    args: {
        useAccountLinks: Object.keys(optionMapping)[1],
    },
};
