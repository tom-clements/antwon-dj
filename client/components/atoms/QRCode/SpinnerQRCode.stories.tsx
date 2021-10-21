import React from 'react';
import { ComponentStory } from '@storybook/react';
import { SpinnerQRCode } from 'components/atoms/QRCode/SpinnerQRCode';
import { QRCodeModule } from 'components/atoms/QRCode/QRCodeModule';

export default {
    title: 'atoms/QRCode/Spinner',
    component: SpinnerQRCode,
    subcomponents: { QRCodeModule },
    argTypes: {
        defaultSize: {
            control: { type: 'range', min: 64, max: 640, step: 64 },
        },
    },
    args: {
        defaultSize: 256,
    }
};

export const Spinner: ComponentStory<typeof SpinnerQRCode> = args => (
    <div style={{ width: args.defaultSize, height: args.defaultSize }}>
        <SpinnerQRCode {...args} />
    </div>
);
Spinner.argTypes = {
    data: { control: { type: 'text' } },
};
Spinner.args = {
    data: 'https://djantwon.com',
};
