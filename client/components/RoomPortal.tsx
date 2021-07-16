import { FC } from "react";
import { FlexCentre } from "components/layout/FlexCentre";
import { Spacing } from "components/layout/Spacing";
import { PrimaryButton } from "components/form/PrimaryButton";
import { RoomCodeInput } from "components/RoomCodeInput";

interface Props {
}

export const RoomPortal: FC<Props> = props => {
    return (
        <FlexCentre>
            <RoomCodeInput />
            <Spacing marginRight={"0.6em"} />
            <PrimaryButton>Go</PrimaryButton>
        </FlexCentre>
    );
};
