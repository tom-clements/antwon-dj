import { CSSProperties, FC } from 'react';
import { getDiamondModulePath, getSquareModulePath, QRCodeModulePath } from 'qr-code/QRCodeModulePath';
import { isFinderPatternModule } from 'qr-code';

export enum QRCodeModuleVariant {
    /**
     * All modules are square
     */
    Square = 0,

    /**
     * All modules are diamond
     */
    Diamond,

    /**
     * Finder patterns modules are square and remaining are diamond
     */
    DiamondWithSquareFinder,
}

function getModulePath(
    i: number,
    j: number,
    moduleCount: number,
    moduleSize: number,
    variant: QRCodeModuleVariant
): QRCodeModulePath {
    switch (variant) {
        case QRCodeModuleVariant.Diamond:
            return getDiamondModulePath(i, j, moduleSize);
        case QRCodeModuleVariant.DiamondWithSquareFinder:
            return isFinderPatternModule(i, j, moduleCount)
                ? getSquareModulePath(i, j, moduleSize)
                : getDiamondModulePath(i, j, moduleSize);
        case QRCodeModuleVariant.Square:
        default:
            return getSquareModulePath(i, j, moduleSize);
    }
}

interface Props {
    /**
     * Column index of the module in its container
     */
    i: number;

    /**
     * Row index of the module in its container
     */
    j: number;

    /**
     * Total number of modules in the QR code container
     */
    moduleCount: number;

    /**
     * QR code viewbox size in pixels
     */
    defaultSize: number;

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
 *
 * (i, j) co-ordinates represent(column, row) indices. The top-left (`TL`)
 * module of the QR code container is the origin. Positive x increases
 * from left-to-right and positive y increases from top-down.
 */
export const QRCodeModule: FC<Props> = props => {
    if (!props.isActive) return null;

    const { i, j, moduleCount, defaultSize, activeColour, variant } = props;
    const moduleSize = defaultSize / moduleCount;
    const modulePath = getModulePath(i, j, moduleCount, moduleSize, variant);

    return (
        <path
            data-i={i}
            data-j={j}
            data-finder={isFinderPatternModule(i, j, moduleCount) ? 'true' : undefined}
            d={modulePath.d}
            fill={activeColour}
            transform={modulePath.transform}
        />
    );
};
