import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { ParsedUrlQuery } from 'querystring';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { ErrorCode } from 'model/enums/ErrorCode';
import { setError } from 'model/slices/ErrorSlice';
import { selectRoomPortalCode, setRoomPortalCode } from 'model/slices/RoomPortalSlice';
import { roomApi } from 'service/RoomApi';
import { QueryResultStatus, QueryResult, isNotFound } from 'components/core/QueryResult';

interface Props {
    render: (roomId: string) => JSX.Element;
    renderLoading: () => JSX.Element;
}

function getRoomCodeFromUrlQuery(query: ParsedUrlQuery): string | null {
    if (query['code'] && query['code'] && !Array.isArray(query['code'])) return query['code'];
    return null;
}

export const RoomProvider: FC<Props> = props => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCodeFromUrlQuery = getRoomCodeFromUrlQuery(router.query);
    const roomCodeFromState = useAppSelector(selectRoomPortalCode);
    const result = roomApi.endpoints.getRoomIdByCode.useQuery(roomCodeFromState ?? skipToken);

    useEffect(() => {
        if (roomCodeFromState !== roomCodeFromUrlQuery) dispatch(setRoomPortalCode(roomCodeFromUrlQuery));
    }, [dispatch, roomCodeFromState, roomCodeFromUrlQuery]);

    useEffect(() => {
        if (isNotFound(result)) {
            router.push({ pathname: '/' });
            dispatch(setError(ErrorCode.RoomNotFound));
        }
    }, [router, dispatch, result]);

    return (
        <QueryResult<string> result={result}>
            {{
                [QueryResultStatus.OK]: data => props.render(data),
                [QueryResultStatus.Pending]: () => props.renderLoading(),
            }}
        </QueryResult>
    );
};
