import _ from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled, InputAdornment, InputLabel, OutlinedInput, FormControl, IconButton } from '@mui/material';
import { Clear, Search as SearchIcon } from '@mui/icons-material';
import { roomApi } from 'room/services/roomApi';
import { SongList } from 'room/components/SongList';
import { SearchSong } from 'room/components/SearchSong';
import type { SongModel } from 'room/model/SongModel';
import { mapSongToDto } from 'room/mappers/mapSongToDto';
import { mapSongFromDto } from 'room/mappers/mapSongFromDto';
import { useDebouncedCallback } from 'use-debounce';

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

const SongListContainer = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: ${props => props.theme.spacing(1, 1, 1, 0.25)};
    border-radius: ${props => props.theme.spacing(1)};
    border: 2px solid ${props => props.theme.palette.primary.main};
`;

export const Search: FC<Props> = props => {
    // TODO WOOOOO, this is a good custom hook candidate no? Jeez
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [addSongToQueue] = roomApi.endpoints.queueSong.useMutation();
    const [triggerSearch, result] = roomApi.endpoints.search.useLazyQuery();

    const search = useDebouncedCallback(
        useCallback(triggerSearch, [triggerSearch]),
        300,
        { leading: true });

    const showDrawer = searchTerm && result.data;

    useEffect(() => {
        if (searchTerm) {
            search({
                query: searchTerm,
                roomId: props.roomId,
            });
        }
    }, [search, searchTerm, props.roomId]);

    const onSelectSong = useCallback(s => {
        addSongToQueue({ roomId: props.roomId, song: mapSongToDto(s) });
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
                                    {searchTerm ? <Clear /> : <SearchIcon />}
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
                        <SongListContainer>
                            <SongList<SongModel>
                                songs={(result.data ?? []).map(mapSongFromDto)}
                                row={rowProps => (
                                    <SearchSong
                                        style={rowProps.style}
                                        key={`${rowProps.data[rowProps.index].uri}_${rowProps.index}`}
                                        title={rowProps.data[rowProps.index].name}
                                        artist={rowProps.data[rowProps.index].artist}
                                        albumUrl={rowProps.data[rowProps.index].albumUrl}
                                        onClick={() => onSelectSong(rowProps.data[rowProps.index])}
                                    />
                                )}
                            />
                        </SongListContainer>
                    </SearchDrawer>
                )}
            </Relative>
        </>
    );
};
