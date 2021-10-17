import { useMemo } from "react";
import qrcode from "qrcode-generator";

type QRCodeGenerator = typeof qrcode;
export type QRCode = ReturnType<typeof qrcode>;

type TypeNumber = Parameters<QRCodeGenerator>[0];
type ErrorCorrectionLevel = Parameters<QRCodeGenerator>[1];
type Data = Parameters<QRCode["addData"]>[0];
type Mode = Exclude<Parameters<QRCode["addData"]>[1], undefined>;

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
