import { FC, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { ErrorCode } from 'model/enums/ErrorCode';
import { selectRoomPortalCode, setRoomPortalCode } from 'model/slices/RoomPortalSlice';
import { roomApi } from 'service/RoomApi';
import { QueryResultStatus, QueryResult, isNotFound } from 'components/core/QueryResult';
import { ErrorRedirect } from 'components/error/ErrorRedirect';

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

    const dispatch = useAppDispatch();
    const roomCodeFromState = useAppSelector(selectRoomPortalCode);
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
