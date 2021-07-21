import _ from "lodash";
import { FC } from "react";
import { TextInput } from "components/form/TextInput";

interface Props {
    roomCode: string | null;
    onChange: (roomCode: string | null) => void;
}

function sanitiseRoomCode(roomCode: string | null) {
    if (_.isEmpty(roomCode)) return null;
    return roomCode;
}

/**
 * This really needs actual validation
 */
export const RoomCodeInput: FC<Props> = props => {
    return (
        <TextInput
            placeholder={"enter code"}
            minLength={6}
            maxLength={6}
            width={"7em"}
            value={props.roomCode ?? ""}
            onChange={event => props.onChange(sanitiseRoomCode(event.target.value))}
        />
    );
};
