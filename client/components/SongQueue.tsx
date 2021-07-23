import { FC } from "react";
import styled from "styled-components";
import { Flex } from "components/layout/Flex";
import { FlexCentre } from "components/layout/FlexCentre";
import { Spacing } from "components/layout/Spacing";
import { Song } from "components/Song";
import { Spinner } from "components/Spinner";
import { roomApi } from "model/service/RoomApi";

export const QueueContainer = styled.div`
    border-width: 0.05em;
    border-style: solid;
    border-right: none;
    border-bottom: none;
    border-left: none;

    border-color: ${props => props.theme.field.base.borderColor};
`;

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
            <QueueContainer>
                {result.data.map(s => <Song key={s.id} {...s} />)}
            </QueueContainer>
        </Flex>
    );
};
