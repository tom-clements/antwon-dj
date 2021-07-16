import { FC } from "react";
import { TextInput } from "components/form/TextInput";

interface Props {
}

export const RoomCodeInput: FC<Props> = props => {
    return (
        <TextInput
            placeholder={"enter code"}
            minLength={6}
            maxLength={6}
            width={"7em"}
        />
    );
};
