import { SVGAttributes } from 'react';

export interface QRCodeModulePath {
    d: SVGAttributes<SVGPathElement>["d"];
    transform: SVGAttributes<SVGPathElement>["transform"];
}

export function getSquareModulePath(i: number, j: number, moduleSize: number): QRCodeModulePath {
    const transformX = Math.round(j * moduleSize);
    const transformY = Math.round(i * moduleSize);
    const moduleWidth = Math.round((j + 1) * moduleSize) - transformX;
    const moduleHeight = Math.round((i + 1) * moduleSize) - transformY;
    return {
        d: `M 0 0 L ${moduleWidth} 0 L ${moduleWidth} ${moduleHeight} L 0 ${moduleHeight} Z`,
        transform: `matrix(${[1, 0, 0, 1, transformX, transformY]})`,
    };
}

export function getDiamondModulePath(i: number, j: number, moduleSize: number): QRCodeModulePath {
    const transformX = Math.round(j * moduleSize);
    const transformY = Math.round(i * moduleSize);
    const moduleWidth = Math.round((j + 1) * moduleSize) - transformX;
    const moduleHeight = Math.round((i + 1) * moduleSize) - transformY;
    return {
        d: `M 0 0 L ${moduleWidth} 0 L ${moduleWidth} ${moduleHeight} L 0 ${moduleHeight} Z`,
        transform: `matrix(${[0.5, 0.5, -0.5, 0.5, transformX + moduleSize / 2, transformY]})`,
    };
}
