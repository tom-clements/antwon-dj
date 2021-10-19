import { CSSProperties, FC } from 'react';
import { getDiamondModulePath, getSquareModulePath, QRCodeModulePath } from 'components/atoms/QRCode/QRCodeModulePath';
import { isFinderPatternModule } from 'model/QRCode';

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
    const modulePath = getModulePath(i, j, moduleCount, moduleSize, variant);

    return (
        <path
            d={modulePath.d}
            fill={activeColour}
            transform={modulePath.transform}
        />
    );
};
