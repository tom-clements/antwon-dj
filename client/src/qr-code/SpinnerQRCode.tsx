import React, { FC } from 'react';
import { styled } from '@mui/material';
import { UseQRCodeProps } from 'qr-code';
import { RadialQRBackground } from 'qr-code/QRMaskBackgrounds';
import { QRCodeModuleVariant } from 'qr-code/QRCodeModule';
import { MaskedQRCode } from 'qr-code/MaskedQRCode';
import { fillTransition } from 'styles/keyframes';

const QRCode = styled(MaskedQRCode)`
    & [data-i]:nth-child(odd):not([data-finder]) {
        animation:
            ${props => fillTransition(props.theme.palette.grey[100], props.theme.palette.grey[900])} 1.33s ease-in-out infinite alternate-reverse
            ;
    }

    & [data-j]:nth-child(even):not([data-finder]) {
        animation:
            ${props => fillTransition(props.theme.palette.grey[900], props.theme.palette.grey[100])} 2s ease-in-out infinite alternate-reverse
            ;
    }
`;

type BaseProps = Pick<UseQRCodeProps, 'data'> & Partial<UseQRCodeProps>;
interface Props extends BaseProps {
    /**
     * QR code viewbox size in pixels
     * Default: 256
     */
     defaultSize?: number;

    /**
     * Module variant style, see `QRCodeModuleVariant` for options.
     * Default: QRCodeModuleVariant.Square
     */
    variant?: QRCodeModuleVariant;
}

export const SpinnerQRCode: FC<Props> = props => {
    const {
        data,
        mode = 'Byte',
        typeNumber = 0,
        errorCorrectionLevel = 'H',
        defaultSize = 256,
        variant = QRCodeModuleVariant.Square,
    } = props;

    return (
        <QRCode
            data={data}
            mode={mode}
            typeNumber={typeNumber}
            errorCorrectionLevel={errorCorrectionLevel}
            defaultSize={defaultSize}
            variant={variant}
            background={
                <RadialQRBackground>
                    <stop offset="5%" stopColor="#aa00ff" />
                    <stop offset="95%" stopColor="#d32f2f" />
                </RadialQRBackground>
            }
        />
    );
};
