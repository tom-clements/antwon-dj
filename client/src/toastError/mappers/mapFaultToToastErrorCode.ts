
import { Fault } from 'common/model/Fault';
import { isApiFault } from 'common/predicates/isFault';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';
import { HttpStatusCode } from 'common/model/HttpStatusCode';

type Context = 'room';

export const mapFaultToToastErrorCode = (fault?: Fault, context?: Context) => {
    if (fault) {
        if (isApiFault(fault)) {
            if (fault.statusCode === HttpStatusCode.BadRequest) {
                if (context === 'room') return ToastErrorCode.RoomValidation;
                return ToastErrorCode.BadRequest;
            }
            if (fault.statusCode === HttpStatusCode.Unauthorized) return ToastErrorCode.Unauthorized;
            if (fault.statusCode === HttpStatusCode.Forbidden) return ToastErrorCode.Forbidden;
            if (fault.statusCode === HttpStatusCode.NotFound) {
                if (context === 'room') return ToastErrorCode.RoomNotFound;
                return ToastErrorCode.NotFound;
            }
            if (fault.statusCode === HttpStatusCode.Conflict) {
                if (context === 'room') return ToastErrorCode.RoomAlreadyExists;
                if (context === 'like') return ToastErrorCode.LikeAlreadyExists;
                return ToastErrorCode.Conflict;
            }
        }
    }

    return ToastErrorCode.Unknown;
};
