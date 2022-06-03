import { Fault } from 'common/model/Fault';
import { isApiFault } from 'common/predicates/isFault';
import { ErrorCode } from 'common/model/ErrorCode';
import { HttpStatusCode } from 'common/model/HttpStatusCode';

export const mapRoomFaultToToastErrorCode = (fault?: Fault) => {
    if (fault) {
        if (isApiFault(fault)) {
            if (fault.statusCode === HttpStatusCode.NotFound) return ErrorCode.RoomNotFound;
        }
    }

    return ErrorCode.Unknown;
};
