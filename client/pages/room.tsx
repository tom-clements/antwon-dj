import { Absolute } from "components/layout/Absolute";
import { Room } from "components/Room";
import { RoomProvider } from "components/RoomProvider";

export default function RoomPage() {
    return (
        <Absolute>
            <RoomProvider render={roomId => <Room roomId={roomId} />} />
        </Absolute>
    )
}
