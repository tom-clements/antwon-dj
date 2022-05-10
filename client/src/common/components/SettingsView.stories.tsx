import { ComponentStory } from '@storybook/react';
import { SettingsView as SettingsViewComponent } from 'common/components/SettingsView';
import { styled } from '@mui/material/styles';

export default {
    title: 'common/SettingsView',
    component: SettingsViewComponent,
    argTypes: {
        onGoBack: { control: false },
    },
    parameters: {
        layout: 'fullscreen',
    }
};

const ChildContent = styled('div')`
    height: 200vh;
    background: repeating-linear-gradient(
        45deg,
        #606dbc,
        #606dbc 10px,
        #465298 10px,
        #465298 20px
    );
    display: flex;
    justify-content: center;
    padding: ${props => props.theme.spacing(2)};
`;

const Template: ComponentStory<typeof SettingsViewComponent> = args => (
    <SettingsViewComponent {...args} />
);

const optionMapping = {
    childContent: <ChildContent>Child content</ChildContent>,
};

export const Default = {
    ...Template.bind({}),
    args: {
        title: 'Settings',
        children: Object.keys(optionMapping)[0],
    },
    argTypes: {
        children: {
            options: Object.keys(optionMapping),
            mapping: optionMapping,
            control: {
                type: 'select',
                labels: { ...Object.keys(optionMapping) }
            },
        },
    },
};
