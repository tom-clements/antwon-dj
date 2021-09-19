import { FC } from "react";
import { Flex } from "components/layout/Flex";
import { Spacing } from "components/layout/Spacing";
import { SongSearch } from "components/SongSearch";
import { SongQueue } from "components/SongQueue";
import { NowPlaying } from "components/NowPlaying";

interface Props {
    roomId: string;
}

export const Room: FC<Props> = props => {
    return (
        <Flex height={"100%"} flexDirection={"column"}>
            <Flex>
                <Spacing width={"100%"} margin={"0.5em 1em"}>
                    <SongSearch roomId={props.roomId} />
                </Spacing>
            </Flex>
            <Flex>
                <Spacing width={"100%"} margin={"0.5em 1em"}>
                    <NowPlaying roomId={props.roomId} />
                </Spacing>
            </Flex>
            <Flex flexGrow={1}>
                <Spacing width={"100%"} margin={"0.5em 1em"}>
                    <SongQueue roomId={props.roomId} />
                </Spacing>
            </Flex>
        </Flex>
    );
};
