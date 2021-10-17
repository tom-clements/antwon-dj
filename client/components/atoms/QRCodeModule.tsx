import { CSSProperties, FC } from 'react';

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
     * Active colour.
     */
    activeColour: CSSProperties['color'];
}

/**
 * Renders an active module within a container space of a given size.
 */
export const QRCodeModule: FC<Props> = props => {
    if (!props.isActive) return null;

    const { i, j, moduleCount, size: containerSize, activeColour } = props;
    const moduleSize = containerSize / moduleCount;
    const transformX = Math.round(j * moduleSize);
    const transformY = Math.round(i * moduleSize);
    const moduleWidth = Math.round((j + 1) * moduleSize) - transformX;
    const moduleHeight = Math.round((i + 1) * moduleSize) - transformY;
    const d = `M 0 0 L ${moduleWidth} 0 L ${moduleWidth} ${moduleHeight} L 0 ${moduleHeight} Z`;

    return (
        <path
            d={d}
            fill={activeColour}
            transform={`matrix(${[1, 0, 0, 1, transformX, transformY]})`}
        />
    );
};
