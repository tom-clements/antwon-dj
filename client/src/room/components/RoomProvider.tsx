import { FC, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useSelector, useDispatch } from 'common/services/createStore';
import { ErrorCode } from 'common/model/ErrorCode';
import { selectRoomPortalCode, setRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { roomApi } from 'room/services/roomApi';
import { QueryResultStatus, QueryResult, isNotFound } from 'common/components/QueryResult';
import { ErrorRedirect } from 'common/components/ErrorRedirect';

interface Props {
    roomCodeFromPage: string;
    render: (roomId: string) => JSX.Element;
    renderLoading: () => JSX.Element;
}

/* TODO refactor this entire component. It's too imperative; and likely hard to test.
 * Refactor out to hooks! Do as part of functional org refactoring.
 */
export const RoomProvider: FC<Props> = props => {
    const { roomCodeFromPage } = props;

    const dispatch = useDispatch();
    const roomCodeFromState = useSelector(selectRoomPortalCode);
    const result = roomApi.endpoints.getRoomIdByCode.useQuery(roomCodeFromState ?? skipToken);

    useEffect(() => {
        if (roomCodeFromState !== roomCodeFromPage) dispatch(setRoomPortalCode(roomCodeFromPage));
    }, [dispatch, roomCodeFromState, roomCodeFromPage]);

    if (isNotFound(result)) return <ErrorRedirect errorCode={ErrorCode.RoomNotFound} />;

    return (
        <QueryResult<string> result={result}>
            {{
                [QueryResultStatus.OK]: data => props.render(data),
                [QueryResultStatus.Pending]: () => props.renderLoading(),
            }}
        </QueryResult>
    );
};
