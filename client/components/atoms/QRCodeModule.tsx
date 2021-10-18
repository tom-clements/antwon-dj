import { CSSProperties, FC, SVGAttributes } from 'react';

export enum QRCodeModuleVariant {
    /**
     * All modules are square
     */
    Square = 0,

    /**
     * All modules are diamond
     */
    Diamond,
}

interface QRCodeModulePath {
    d: SVGAttributes<SVGPathElement>["d"];
    transform: SVGAttributes<SVGPathElement>["transform"];
}

function getModulePath(i: number, j: number, moduleSize: number, variant: QRCodeModuleVariant): QRCodeModulePath {
    switch (variant) {
        case QRCodeModuleVariant.Diamond: {
            const transformX = Math.round(j * moduleSize);
            const transformY = Math.round(i * moduleSize);
            const moduleWidth = Math.round((j + 1) * moduleSize) - transformX;
            const moduleHeight = Math.round((i + 1) * moduleSize) - transformY;
            return {
                d: `M 0 0 L ${moduleWidth} 0 L ${moduleWidth} ${moduleHeight} L 0 ${moduleHeight} Z`,
                transform: `matrix(${[0.5, 0.5, -0.5, 0.5, transformX + moduleSize / 2, transformY]})`,
            };
        }
        case QRCodeModuleVariant.Square:
        default: {
            const transformX = Math.round(j * moduleSize);
            const transformY = Math.round(i * moduleSize);
            const moduleWidth = Math.round((j + 1) * moduleSize) - transformX;
            const moduleHeight = Math.round((i + 1) * moduleSize) - transformY;
            return {
                d: `M 0 0 L ${moduleWidth} 0 L ${moduleWidth} ${moduleHeight} L 0 ${moduleHeight} Z`,
                transform: `matrix(${[1, 0, 0, 1, transformX, transformY]})`,
            };
        }
    }
}

interface Props {
    /**
     * Row index of the module in its container
     */
    i: number;

    /**
     * Column index of the module in its container
     */
    j: number;

    /**
     * Total number of modules in the QR code container
     */
    moduleCount: number;

    /**
     * QR code container size in pixels
     */
    size: number;

    /**
     * Whether the given module is active or 'dark'
     */
    isActive: boolean;

    /**
     * Active colour
     */
    activeColour: CSSProperties['color'];

    /**
     * Module variant style, see `QRCodeModuleVariant` for options
     */
    variant: QRCodeModuleVariant;
}

/**
 * Renders an active module within a container space of a given size.
 */
export const QRCodeModule: FC<Props> = props => {
    if (!props.isActive) return null;

    const { i, j, moduleCount, size, activeColour, variant } = props;
    const moduleSize = size / moduleCount;
    const modulePath = getModulePath(i, j, moduleSize, variant);

    return (
        <path
            d={modulePath.d}
            fill={activeColour}
            transform={modulePath.transform}
        />
    );
};
