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
        <QueueWrapper>
            <FlexCentre>
                <Spinner scale={3} />
            </FlexCentre>
        </QueueWrapper>
    );

    if (result.isError || !result.data) return (
        <QueueWrapper>
            <FlexCentre>
                Could not find room queue
            </FlexCentre>
        </QueueWrapper>
    );

    return (
        <QueueWrapper>
            {
                result.data
                    .filter(s => !s.is_played && !s.is_removed)
                    .map((s, i) => <Song key={`${s.id}_${i}`} song={s} />)
            }
        </QueueWrapper>
    );
};

const QueueWrapper: FC = props => {
    return (
        <Flex flexDirection="column">
            <Spacing marginBottom={"0.5em"}>
                Queue:
            </Spacing>
            {props.children}
        </Flex>
    );
}
