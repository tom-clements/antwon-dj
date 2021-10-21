import React, { FC } from 'react';
import { styled } from '@mui/material';
import { UseQRCodeProps } from 'model/QRCode';
import { RadialQRBackground } from 'components/atoms/QRCode/QRMaskBackgrounds';
import { MaskedQRCode } from 'components/atoms/QRCode/MaskedQRCode';
import { fillTransition } from 'styles/keyframes';

const QRCode = styled(MaskedQRCode)`
    & [data-i]:nth-child(odd):not([data-finder]) {
        animation:
            ${props => fillTransition(props.theme.palette.grey[100], props.theme.palette.grey[900])} 1s ease-in-out infinite alternate-reverse
            ;
    }

    & [data-j]:nth-child(even):not([data-finder]) {
        animation:
            ${props => fillTransition(props.theme.palette.grey[900], props.theme.palette.grey[100])} 1.33s ease-in-out infinite alternate-reverse
            ;
    }
`;

interface Props extends Pick<UseQRCodeProps, 'data'> {
    /**
     * QR code viewbox size in pixels
     * Default: 256
     */
     defaultSize?: number;
}

export const SpinnerQRCode: FC<Props> = props => {
    const {
        data,
        defaultSize = 256,
    } = props;

    return (
        <QRCode
            data={data}
            mode={'Byte'}
            typeNumber={0}
            errorCorrectionLevel={'H'}
            defaultSize={defaultSize}
            background={
                <RadialQRBackground>
                    <stop offset="5%" stopColor="#aa00ff" />
                    <stop offset="95%" stopColor="#d32f2f" />
                </RadialQRBackground>
            }
        />
    );
};
