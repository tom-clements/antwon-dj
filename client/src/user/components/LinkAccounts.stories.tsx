import type { ComponentProps } from 'react';
import type { Story } from '@storybook/react';
import type { Dependencies } from 'common/services/DependencyContext';
import { DependencyProvider } from 'common/components/DependencyProvider';
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
        useBreadcrumbs: () => ({
            isRoot: false,
            goBack: () => undefined
        }),
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
        useBreadcrumbs: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    },
};

const Template: Story<ComponentProps<typeof LinkAccountsComponent> & Partial<Dependencies>> = args => (
    <DependencyProvider {...args}>
        <LinkAccountsComponent {...args} />
    </DependencyProvider>
);

export const Default = Template.bind({});
