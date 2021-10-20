import React from 'react';
import { ComponentStory } from '@storybook/react';
import { SpinnerQRCode } from 'components/atoms/QRCode/SpinnerQRCode';
import { QRCodeModule } from 'components/atoms/QRCode/QRCodeModule';

export default {
    title: 'atoms/QRCode/Spinner',
    component: SpinnerQRCode,
    subcomponents: { QRCodeModule },
    argTypes: {
        size: {
            control: { type: 'range', min: 64, max: 640, step: 64 },
        },
    },
    args: {
        size: 256,
    }
};

export const Spinner: ComponentStory<typeof SpinnerQRCode> = args => (
    <SpinnerQRCode {...args} />
);
Spinner.argTypes = {
    data: { control: { type: 'text' } },
};
Spinner.args = {
    data: 'https://djantwon.com',
};
