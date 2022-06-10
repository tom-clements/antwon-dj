import type { SongDto } from 'room/dtos/SongDto';
import { SongModel } from 'room/model/SongModel';

export const mapSongToDto = (model: SongModel): SongDto => ({
    song_uri: model.uri,
    song_artist: model.artist,
    song_name: model.name,
    song_album_url: model.albumUrl,
});
