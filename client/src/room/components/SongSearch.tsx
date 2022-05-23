import _ from 'lodash';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { spotifySearchApi } from 'providers/spotify/services/spotifySearchApi';
import { roomApi } from 'room/services/roomApi';
import { SongSearchList } from 'room/components/SongSearchList';

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
    const [searchTerm, setSearchTerm] = useState<string | null>(null); // todo: Put this in redux
    const [addSongToQueue] = roomApi.endpoints.addSongToQueue.useMutation();
    const [triggerSearch, result] = spotifySearchApi.endpoints.getSongsForSearch.useLazyQuery();
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
                        <SongSearchList songs={result.data ?? []} onSelectSong={s => {
                            addSongToQueue({roomId: props.roomId, song: s});
                            setSearchTerm(''); // todo: compose this
                        }} />
                    </SearchDrawer>
                )}
            </Relative>
        </>
    );
};
