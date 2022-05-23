import React from 'react';
import { ComponentStory } from '@storybook/react';
import { QRCode } from 'qr-code/QRCode';
import { QRCodeModule, QRCodeModuleVariant } from 'qr-code/QRCodeModule';

export default {
    title: 'qr-code',
    component: QRCode,
    subcomponents: { QRCodeModule },
    argTypes: {
        defaultSize: {
            control: { type: 'range', min: 64, max: 640, step: 64 },
        },
        activeColour: {
            type: { name: 'string' },
            control: { type: 'color' },
        },
        variant: {
            options: Object.keys(QRCodeModuleVariant).filter(x => isNaN(parseInt(x))),
            mapping: QRCodeModuleVariant,
            control: { type: 'inline-radio' },
        }
    },
    args: {
        defaultSize: 256,
        activeColour: '#fff',
        variant: QRCodeModuleVariant[QRCodeModuleVariant.Square],
    }
};

export const Default: ComponentStory<typeof QRCode> = args => (
    <div style={{ width: args.defaultSize, height: args.defaultSize }}>
        <QRCode {...args} />
    </div>
);
Default.argTypes = {
    data: { control: { type: 'text' } },
    mode: { control: { type: 'inline-radio' } },
    typeNumber: {
        type: { name: 'number', required: true },
        control: { type: 'range', min: 0, max: 40, step: 1 },
    },
    errorCorrectionLevel: { control: { type: 'inline-radio' } },
};
Default.args = {
    data: 'https://djantwon.com',
    mode: 'Byte',
    typeNumber: 0,
    errorCorrectionLevel: 'H',
};
