import _ from 'lodash';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { roomApi } from 'room/services/roomApi';
import { SongList } from 'room/components/SongList';
import { SearchSong } from 'room/components/SearchSong';

interface Props {
    roomId: string;
}

function sanitiseSearchTerm(searchTerm: string | null) {
    if (_.isEmpty(searchTerm)) return null;
    return searchTerm;
}

const BackgroundMask = styled(Box)`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.palette.background.default};
    opacity: 0.93;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const SearchDrawer = styled(Box)`
    position: absolute;
    top: 56px;
    left: 0;
    width: 100%;
    height: 75vh;
    padding: ${props => props.theme.spacing(2, 0)};
`;

const Relative = styled(Box)`
    position: relative;
    z-index: 2;
`;

export const SongSearch: FC<Props> = props => {
    // TODO WOOOOO, this is a good custom hook candidate no? Jeez
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [addSongToQueue] = roomApi.endpoints.queue.useMutation();
    const [triggerSearch, result] = roomApi.endpoints.search.useLazyQuery();
    const debouncedSearch = useCallback((arg: { query: string; roomId: string; }) => {
        return _.debounce(() => triggerSearch(arg), 200, { leading: true })();
    }, [triggerSearch]);
    const showDrawer = searchTerm && result.data;

    useEffect(() => {
        if (searchTerm) {
            debouncedSearch({
                query: searchTerm,
                roomId: props.roomId,
            });
        }
    }, [debouncedSearch, searchTerm, props.roomId]);

    const onSelectSong = useCallback(s => {
        addSongToQueue({ roomId: props.roomId, song: s });
        setSearchTerm(''); // todo: compose this
    }, [addSongToQueue, setSearchTerm, props.roomId]);

    return (
        <>
            {showDrawer && <BackgroundMask />}
            <Relative onTouchEndCapture={event => event.stopPropagation()}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-song-search">search...</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        value={searchTerm ?? ''}
                        onChange={event => setSearchTerm(sanitiseSearchTerm(event.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setSearchTerm('')}
                                    edge="end"
                                >
                                    {searchTerm ? <Clear /> : <Search />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="song-search"
                        autoComplete={'off'}
                        fullWidth
                    />
                </FormControl>
                {showDrawer && (
                    <SearchDrawer>
                        <SongList
                            songs={result.data ?? []}
                            row={rowProps => (
                                <SearchSong
                                    style={rowProps.style}
                                    key={`${rowProps.data[rowProps.index].song_uri}_${rowProps.index}`}
                                    title={rowProps.data[rowProps.index].song_name}
                                    artist={rowProps.data[rowProps.index].song_artist}
                                    albumUrl={rowProps.data[rowProps.index].song_album_url}
                                    onClick={() => onSelectSong(rowProps.data[rowProps.index])}
                                />
                            )}
                        />
                    </SearchDrawer>
                )}
            </Relative>
        </>
    );
};
