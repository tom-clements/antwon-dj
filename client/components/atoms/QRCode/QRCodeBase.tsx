import React, { CSSProperties, FC } from 'react';
import { QRCodeModule, QRCodeModuleVariant } from 'components/atoms/QRCode/QRCodeModule';
import { useQRCode, UseQRCodeProps } from 'model/QRCode';

interface Props extends UseQRCodeProps {
    /**
     * QR code container size in pixels
     */
    size: number;

    /**
     * Active colour
     */
    activeColour?: CSSProperties['color'];

    /**
     * Module variant style, see `QRCodeModuleVariant` for options.
     * Default: QRCodeModuleVariant.Square
     */
    variant: QRCodeModuleVariant;
}

export const QRCodeBase: FC<Props> = props => {
    const qrCode = useQRCode(props);
    const moduleCount = qrCode.getModuleCount();

    if (!moduleCount) {
        return (
            <>
                <text style={{ fill: props.activeColour, transform: 'translateY(1em)' }}>
                    Error
                </text>
                <text style={{ fill: props.activeColour, transform: 'translateY(2em)' }}>
                    No modules to render
                </text>
            </>
        );
    }

    const moduleIndex = Array.from(Array(moduleCount).keys());

    return (
        <>
            {
                moduleIndex.map(rowIndex =>
                    moduleIndex.map(columnIndex =>
                        <QRCodeModule
                            key={`qrm_${columnIndex}_${rowIndex}`}
                            i={columnIndex}
                            j={rowIndex}
                            moduleCount={moduleCount}
                            size={props.size}
                            isActive={qrCode.isDark(rowIndex, columnIndex)}
                            variant={props.variant}
                            activeColour={props.activeColour}
                        />
                    ))
            }
        </>
    );
};
