import React, { FC } from 'react';
import { QRCodeModuleVariant } from 'components/atoms/QRCode/QRCodeModule';
import { UseQRCodeProps } from 'model/QRCode';
import { QRCodeBase } from 'components/atoms/QRCode/QRCodeBase';
import { QRMaskBackgrounds } from 'components/atoms/QRCode/QRMaskBackgrounds';

interface Props extends UseQRCodeProps {
    /**
     * Element to mask with the QR code pattern
     * It _must_ have the id `codeBackground`
     */
    background: QRMaskBackgrounds;

    /**
     * QR code container size in pixels
     * Default: 256
     */
    size?: number;

    /**
     * Module variant style, see `QRCodeModuleVariant` for options.
     * Default: QRCodeModuleVariant.Square
     */
    variant?: QRCodeModuleVariant;

    /**
     * Classname to apply to container SVG
     * Also allows for `styled`-esque libraries to inject styling
     */
    className?: string;
}

export const MaskedQRCode: FC<Props> = props => {
    const {
        data,
        mode,
        typeNumber,
        errorCorrectionLevel,
        size = 256,
        variant = QRCodeModuleVariant.Square,
        className
    } = props;

    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={size} height={size} className={className}>
            <defs>
                {props.background}
                <mask id={'codeMask'}>
                    <QRCodeBase
                        data={data}
                        mode={mode}
                        typeNumber={typeNumber}
                        errorCorrectionLevel={errorCorrectionLevel}
                        size={size}
                        activeColour={'#fff'}
                        variant={variant}
                    />
                </mask>
            </defs>
            <rect
                x={0}
                y={0}
                width={size}
                height={size}
                fill={'url(#codeBackground)'}
                mask={'url(#codeMask)'}
            />
        </svg>
    );
};
