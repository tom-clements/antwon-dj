import type { SongDto } from 'room/dtos/SongDto';
import { SongModel } from 'room/model/SongModel';

export const mapSongFromDto = (dto: SongDto): SongModel => ({
    uri: dto.song_uri,
    artist: dto.song_artist,
    name: dto.song_name,
    albumUrl: dto.song_album_url,
});
