import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { FlexCentre } from "components/layout/FlexCentre";
import { Spacing } from "components/layout/Spacing";
import { PrimaryButton } from "components/form/PrimaryButton";
import { RoomCodeInput } from "components/RoomCodeInput";
import { Spinner } from "components/Spinner";
import { useAppSelector, useAppDispatch } from "model/Store";
import { selectRoomCode, setRoomCode } from "model/RoomPortalSlice";
import { roomApi } from "model/service/RoomApi";

function isValidRoomCode(roomCode: string | null): roomCode is string {
    if (roomCode === null) return false;
    return true;
}

interface Props {
}

export const RoomPortal: FC<Props> = props => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector(selectRoomCode);
    const [trigger, result] = roomApi.endpoints.getRoomIdByCode.useLazyQuery();

    const isPending = result.isLoading || result.isFetching;
    const hasRoomId = result.isSuccess && result.data;
    const roomId = hasRoomId ? result.data : null;

    useEffect(() => {
        if (roomId) router.push({
            pathname: "room",
            query: { code: roomCode, },
        });
    }, [roomId]);

    return (
        <FlexCentre>
            <RoomCodeInput roomCode={roomCode} onChange={roomCode => dispatch(setRoomCode(roomCode))} />
            <Spacing marginRight={"0.6em"} />
            <PrimaryButton onClick={() => isValidRoomCode(roomCode) && trigger(roomCode)}>
                <span style={{ width: "2em", display: "inline-block" }}>
                    {isPending ? <Spinner scale={7 / 15} /> : "Go"}
                </span>
            </PrimaryButton>
        </FlexCentre>
    );
};
