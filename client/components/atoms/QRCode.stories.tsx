import React from 'react';
import { ComponentStory } from '@storybook/react';
import { QRCode as QRCode } from 'components/atoms/QRCode';
import { QRCodeModule } from 'components/atoms/QRCodeModule';

export default {
    title: 'atoms/QRCode',
    component: QRCode,
    subcomponents: { QRCodeModule },
    argTypes: {
        size: {
            control: { type: 'range', min: 64, max: 640, step: 64 },
        },
        activeColour: {
            type: { name: 'string' },
            control: { type: 'color' },
        },
    },
    args: {
        size: 256,
        activeColour: '#fff',
    }
};

export const Default: ComponentStory<typeof QRCode> = args => (
    <QRCode {...args} />
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
