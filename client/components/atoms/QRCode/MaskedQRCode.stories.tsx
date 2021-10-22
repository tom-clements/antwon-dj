import React from 'react';
import { ComponentStory } from '@storybook/react';
import { MaskedQRCode } from 'components/atoms/QRCode/MaskedQRCode';
import { QRCodeModule, QRCodeModuleVariant } from 'components/atoms/QRCode/QRCodeModule';
import { RadialQRBackground } from 'components/atoms/QRCode/QRMaskBackgrounds';

export default {
    title: 'atoms/QRCode/Masked',
    component: MaskedQRCode,
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
        background: { table: { disable: true } },
        className: { table: { disable: true } },
    },
    args: {
        defaultSize: 256,
        variant: QRCodeModuleVariant[QRCodeModuleVariant.Square],
    }
};

export const Masked: ComponentStory<typeof MaskedQRCode> = args => (
    <div style={{ width: args.defaultSize, height: args.defaultSize }}>
        <MaskedQRCode
            {...args}
            background={
                <RadialQRBackground>
                    <stop offset="5%" stopColor="#aa00ff" />
                    <stop offset="95%" stopColor="#d32f2f" />
                </RadialQRBackground>
            }
        />
    </div>
);
Masked.argTypes = {
    data: { control: { type: 'text' } },
    mode: { control: { type: 'inline-radio' } },
    typeNumber: {
        type: { name: 'number', required: true },
        control: { type: 'range', min: 0, max: 40, step: 1 },
    },
    errorCorrectionLevel: { control: { type: 'inline-radio' } },
};
Masked.args = {
    data: 'https://djantwon.com',
    mode: 'Byte',
    typeNumber: 0,
    errorCorrectionLevel: 'H',
};
