import React, { CSSProperties, FC } from 'react';
import { QRCodeModuleVariant } from 'qr-code/QRCodeModule';
import { UseQRCodeProps } from 'qr-code';
import { QRCodeBase } from 'qr-code/QRCodeBase';

interface Props extends UseQRCodeProps {
    /**
     * QR code viewbox size in pixels
     * Default: 256
     */
    defaultSize?: number;

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
        defaultSize = 256,
        activeColour = '#fff',
        variant = QRCodeModuleVariant.Square,
    } = props;

    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            style={{ width: '100%', height: '100%' }}
            viewBox={`0 0 ${defaultSize} ${defaultSize}`}
        >
            <QRCodeBase
                data={data}
                mode={mode}
                typeNumber={typeNumber}
                errorCorrectionLevel={errorCorrectionLevel}
                defaultSize={defaultSize}
                activeColour={activeColour}
                variant={variant}
            />
        </svg>
    );
};
