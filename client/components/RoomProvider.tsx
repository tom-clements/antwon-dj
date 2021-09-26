import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { ParsedUrlQuery } from 'querystring';
import { FlexCentre } from 'components/layout/FlexCentre';
import { Spinner } from 'components/core/Spinner';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { selectRoomCode, setRoomCode } from 'model/RoomPortalSlice';
import { roomApi } from 'model/service/RoomApi';

interface Props {
    render: (roomId: string) => JSX.Element; // todo: Maybe use context? Or just get from state.
}

function getRoomCodeFromUrlQuery(query: ParsedUrlQuery): string | null {
    if (query['code'] && query['code'] && !Array.isArray(query['code'])) return query['code'];
    return null;
}

export const RoomProvider: FC<Props> = props => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCodeFromUrlQuery = getRoomCodeFromUrlQuery(router.query);
    const roomCodeFromState = useAppSelector(selectRoomCode);
    const result = roomApi.endpoints.getRoomIdByCode.useQuery(roomCodeFromState ?? skipToken);

    useEffect(() => {
        if (roomCodeFromState !== roomCodeFromUrlQuery) dispatch(setRoomCode(roomCodeFromUrlQuery));
    }, [dispatch, roomCodeFromState, roomCodeFromUrlQuery]);

    const isPending = result.isLoading || result.isFetching;
    if (isPending) return (
        <FlexCentre>
            <Spinner scale={5} />
        </FlexCentre>
    );

    if (result.isError || !result.data) return (
        <FlexCentre>
            This room does not exist. Have you specified a room code?
        </FlexCentre>
    );

    return props.render(result.data);
};
