import React, { CSSProperties, FC } from 'react';
import { QRCodeModuleVariant } from 'components/atoms/QRCode/QRCodeModule';
import { UseQRCodeProps } from 'model/QRCode';
import { QRCodeBase } from 'components/atoms/QRCode/QRCodeBase';

interface Props extends UseQRCodeProps {
    /**
     * QR code container size in pixels
     * Default: 256
     */
    size?: number;

    /**
     * Active colour. Default: #fff
     */
    activeColour?: CSSProperties['color'];

    /**
     * Module variant style, see `QRCodeModuleVariant` for options.
     * Default: QRCodeModuleVariant.Square
     */
    variant?: QRCodeModuleVariant;
}

export const QRCode: FC<Props> = props => {
    const {
        data,
        mode,
        typeNumber,
        errorCorrectionLevel,
        size = 256,
        activeColour = '#fff',
        variant = QRCodeModuleVariant.Square,
    } = props;

    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={size} height={size}>
            <QRCodeBase
                data={data}
                mode={mode}
                typeNumber={typeNumber}
                errorCorrectionLevel={errorCorrectionLevel}
                size={size}
                activeColour={activeColour}
                variant={variant}
            />
        </svg>
    );
};
