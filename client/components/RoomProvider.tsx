import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { FlexCentre } from "components/layout/FlexCentre";
import { Spinner } from "components/Spinner";
import { useAppSelector, useAppDispatch } from "model/Store";
import { selectRoomCode, setRoomCode } from "model/RoomPortalSlice";
import { roomApi } from "model/service/RoomApi";

interface Props {
}

function getRoomCodeFromUrlQuery(query: ParsedUrlQuery): string | null {
    console.log(query["roomCode"]);
    if (query["roomCode"] && query["roomCode"] && !Array.isArray(query["roomCode"])) return query["roomCode"];
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
    }, [roomCodeFromState, roomCodeFromUrlQuery]);

    const isPending = result.isLoading || result.isFetching;
    if (isPending) return (
        <FlexCentre>
            <Spinner scale={5} />
        </FlexCentre>
    );

    if (result.isError) return (
        <FlexCentre>
            This room does not exist. Have you specified a room code?
        </FlexCentre>
    );

    const hasRoomId = result.isSuccess && result.data;
    const roomId = hasRoomId ? result.data : null;

    return (
        <FlexCentre>
            {`RoomCode: ${roomCodeFromState}`}
            {`RoomCode: ${roomCodeFromUrlQuery}`}
            {`Roomid: ${roomId}`}
        </FlexCentre>
    );
};
