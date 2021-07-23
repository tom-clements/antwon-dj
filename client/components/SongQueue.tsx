import { FC } from "react";
import { Flex } from "components/layout/Flex";
import { FlexCentre } from "components/layout/FlexCentre";
import { Spacing } from "components/layout/Spacing";
import { Song } from "components/Song";
import { Spinner } from "components/Spinner";
import { roomApi } from "model/service/RoomApi";

interface Props {
    roomId: string;
}

export const SongQueue: FC<Props> = props => {
    const result = roomApi.endpoints.getRoomQueue.useQuery(props.roomId);

    const isPending = result.isLoading || result.isFetching;
    if (isPending) return (
        <FlexCentre>
            <Spinner scale={3} />
        </FlexCentre>
    );

    if (result.isError || !result.data) return (
        <FlexCentre>
            Could not find room queue
        </FlexCentre>
    );

    return (
        <Flex flexDirection="column">
            <Spacing marginBottom={"0.5em"}>
                Queue:
            </Spacing>
            {result.data.map((s, i) => <Song key={`${s.id}_${i}`} song={s} />)}
        </Flex>
    );
};
