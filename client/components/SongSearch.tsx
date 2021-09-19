import _ from "lodash";
import styled from "styled-components";
import { FC, useCallback, useEffect, useState } from "react";
import { Absolute } from "components/layout/Absolute";
import { Relative } from "components/layout/Relative";
import { TextInput } from "components/form/TextInput";
import { SongSearchList } from "components/SongSearchList";
import { spotifySearchApi } from "model/service/SpotifySearchApi";
import { roomApi } from "model/service/RoomApi";

const BackgroundMask = styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.background};
    opacity: 0.93;
`;

interface Props {
    roomId: string;
}

function sanitiseSearchTerm(searchTerm: string | null) {
    if (_.isEmpty(searchTerm)) return null;
    return searchTerm;
}

export const SongSearch: FC<Props> = props => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null); // todo: Put this in redux
    const [addSongToQueue] = roomApi.endpoints.addSongToQueue.useMutation();
    const [triggerSearch, result] = spotifySearchApi.endpoints.getSongsForSearch.useLazyQuery();
    const debouncedSearch = useCallback(_.debounce(triggerSearch, 100), []);

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch({
                query: searchTerm,
                roomId: props.roomId,
            });
        }
    }, [searchTerm]);

    return (
        <>
            {
                searchTerm && result.data && <Absolute top={0} left={0}>
                    <BackgroundMask />
                </Absolute>
            }
            <Relative width={"100%"}>
                <TextInput
                    placeholder={"search for songs"}
                    width={"100%"}
                    value={searchTerm ?? ""}
                    onChange={event => setSearchTerm(sanitiseSearchTerm(event.target.value))}
                />
                <Absolute>
                    {searchTerm && result.data && <SongSearchList songs={result.data} onSelectSong={s => {
                        addSongToQueue({ ...s, room_guid: props.roomId });
                        setSearchTerm(""); // todo: compose this
                    }} />}
                </Absolute>
            </Relative>
        </>
    );
};
