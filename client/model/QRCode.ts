import { useMemo } from 'react';
import qrcode from 'qrcode-generator';

type QRCodeGenerator = typeof qrcode;
export type QRCode = ReturnType<typeof qrcode>;

type TypeNumber = Parameters<QRCodeGenerator>[0];
type ErrorCorrectionLevel = Parameters<QRCodeGenerator>[1];
type Data = Parameters<QRCode['addData']>[0];
type Mode = Exclude<Parameters<QRCode['addData']>[1], undefined>;

export type UseQRCodeProps = {
    data: Data;
    mode: Mode;
    typeNumber: TypeNumber;
    errorCorrectionLevel: ErrorCorrectionLevel;
}

export function useQRCode(props: UseQRCodeProps): QRCode {
    const data = props.data || '';
    const mode = props.mode || 'Byte';
    const typeNumber = props.typeNumber || 0;
    const errorCorrectionLevel = props.errorCorrectionLevel || 'H';

    return useMemo(() => {
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        try {
            qr.addData(data, mode);
            qr.make();
        } catch {
            // Not much can be done here, so just return the qr object
            // with no modules and leave handling to the UI layer.
        }
        return qr;
    }, [data, mode, typeNumber, errorCorrectionLevel]);
}

/**
 * (x,y) mapping matrix that can be used find finder pattern modules.
 *
 * @param x x-column offset
 */
const finderPatternXYMap = (x: number): number[][] => [
    [x - 7, x - 6, x - 5, x - 4, x - 3, x - 2, x - 1],
    [x - 7, /*                               */x - 1],
    [x - 7, /*   */x - 5, x - 4, x - 3,/*    */x - 1],
    [x - 7, /*   */x - 5, x - 4, x - 3,/*    */x - 1],
    [x - 7, /*   */x - 5, x - 4, x - 3,/*    */x - 1],
    [x - 7, /*                               */x - 1],
    [x - 7, x - 6, x - 5, x - 4, x - 3, x - 2, x - 1],
];

/**
 * Returns a boolean indicating whether the given (`i`, `j`) module co-ordinate
 * is part of a finder pattern in a QR code of moduleCount length `m`.
 *
 * A QR code contains 3 finder patterns in the top-left (`TL`), top-right (`TR`),
 * and bottom-left (`BL`) corners. It consists of a 7x7 outline of module width
 * with a 3x3 square in the center.
 *
 * For a QR code of length `m` modules, the top-left (`TL`) corners of the 3
 * finder patterns are located at:
 * * `TL`: (     0,     0 )
 * * `TR`: ( m - 7,     0 )
 * * `BL`: (     0, m - 7 )
 *
 * Therefore we can positively identify modules in the `TL` and `BL` finder
 * patterns by passing `j` co-ordinates on the y-row domain `[0, 7)` by calling:
 * `finderPatternXYMap(7)[j]` and `finderPatternXYMap(m)[j]`.
 *
 * If the `i` co-ordinate is contained in either of the resulting 1D arrays, it
 * is part of the `TL` or `BL` finder patterns.
 *
 * For the `TR` corner on x-row domain `[0, 7)` and y-row domain [m - 7, m), we
 * can swap the `BL` case's co-ordinates to mirror the pattern.
 */
export function isFinderPatternModule(i: number, j: number, m: number) {
    // Edge cases
    if (m <= 0 || i >= m || j >= m) return false;

    // TL and BL corners
    if (j >= 0 && j < 7) {
        return finderPatternXYMap(7)[j].includes(i) || finderPatternXYMap(m)[j].includes(i);
    }

    // TR corner
    if (i < 7 && j >= m - 7 && j < m) return finderPatternXYMap(m)[i].includes(j);

    return false;
}
