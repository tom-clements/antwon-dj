import _ from "lodash";
import { FC, useCallback, useEffect, useState } from "react";
import { Absolute } from "components/layout/Absolute";
import { Relative } from "components/layout/Relative";
import { TextInput } from "components/form/TextInput";
import { SongSearchList } from "components/SongSearchList";
import { spotifySearchApi } from "model/service/SpotifySearchApi";

interface Props {
    roomId: string;
}

function sanitiseSearchTerm(searchTerm: string | null) {
    if (_.isEmpty(searchTerm)) return null;
    return searchTerm;
}

export const SongSearch: FC<Props> = props => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null); // todo: Put this in redux
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
        <Relative width={"100%"}>
            <TextInput
                placeholder={"search for songs"}
                width={"100%"}
                value={searchTerm ?? ""}
                onChange={event => setSearchTerm(sanitiseSearchTerm(event.target.value))}
            />
            <Absolute>
                {searchTerm && result.data && <SongSearchList songs={result.data} />}
            </Absolute>
        </Relative>
    );
};
