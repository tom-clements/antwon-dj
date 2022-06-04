
import { Fault } from 'common/model/Fault';
import { isApiFault } from 'common/predicates/isFault';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';
import { HttpStatusCode } from 'common/model/HttpStatusCode';

type Context = 'room';

export const mapFaultToToastErrorCode = (fault?: Fault, context?: Context) => {
    if (fault) {
        if (isApiFault(fault)) {
            if (fault.statusCode === HttpStatusCode.NotFound) {
                if (context === 'room') return ToastErrorCode.RoomNotFound;
                return ToastErrorCode.NotFound;
            }
        }
    }

    return ToastErrorCode.Unknown;
};
