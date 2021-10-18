import React, { CSSProperties, FC } from 'react';
import { QRCodeModule, QRCodeModuleVariant } from 'components/atoms/QRCodeModule';
import { useQRCode, UseQRCodeProps } from 'model/QRCode';

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
        size = 256,
        activeColour = '#fff',
        variant = QRCodeModuleVariant.Square,
    } = props;

    const qrCode = useQRCode(props);
    const moduleCount = qrCode.getModuleCount();

    if (!moduleCount) {
        return (
            <svg xmlns={'http://www.w3.org/2000/svg'} width={size} height={size}>
                <text style={{ fill: props.activeColour, transform: 'translateY(1em)' }}>
                    Error
                </text>
                <text style={{ fill: props.activeColour, transform: 'translateY(2em)' }}>
                    No modules to render
                </text>
            </svg>
        );
    }

    const moduleIndex = Array.from(Array(moduleCount).keys());

    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} width={size} height={size}>
            {
                moduleIndex.map(i =>
                    moduleIndex.map(j =>
                        <QRCodeModule
                            key={`qrm_${i}_${j}`}
                            i={i}
                            j={j}
                            moduleCount={moduleCount}
                            size={size}
                            isActive={qrCode.isDark(i, j)}
                            variant={variant}
                            activeColour={activeColour}
                        />
                    ))
            }
        </svg>
    );
};
