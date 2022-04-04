import React from 'react';
import { ComponentStory } from '@storybook/react';
import { SpinnerQRCode } from 'components/atoms/QRCode/SpinnerQRCode';
import { QRCodeModule, QRCodeModuleVariant } from 'components/atoms/QRCode/QRCodeModule';

export default {
    title: 'atoms/QRCode/Spinner',
    component: SpinnerQRCode,
    subcomponents: { QRCodeModule },
    argTypes: {
        defaultSize: {
            control: { type: 'range', min: 64, max: 640, step: 64 },
        },
        variant: {
            options: Object.keys(QRCodeModuleVariant).filter(x => isNaN(parseInt(x))),
            mapping: QRCodeModuleVariant,
            control: { type: 'inline-radio' },
        },
    },
    args: {
        defaultSize: 256,
        variant: QRCodeModuleVariant[QRCodeModuleVariant.Square],
    }
};

export const Spinner: ComponentStory<typeof SpinnerQRCode> = args => (
    <div style={{ width: args.defaultSize, height: args.defaultSize }}>
        <SpinnerQRCode {...args} />
    </div>
);
Spinner.argTypes = {
    data: { control: { type: 'text' } },
    mode: { control: { type: 'inline-radio' } },
    typeNumber: {
        type: { name: 'number', required: true },
        control: { type: 'range', min: 0, max: 40, step: 1 },
    },
    errorCorrectionLevel: { control: { type: 'inline-radio' } },
};
Spinner.args = {
    data: 'https://djantwon.com',
    mode: 'Byte',
    typeNumber: 0,
    errorCorrectionLevel: 'H',
};
