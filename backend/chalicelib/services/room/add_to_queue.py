import datetime
from dataclasses import asdict

from chalicelib.data.queries.queue.create_room_song import create_room_song
from chalicelib.data.queries.queue.create_song import create_song
from chalicelib.data.error_handling import SongNotFoundDbError
from chalicelib.data.queries.read_one_queries import get_song_from_song_uri
from chalicelib.data.queries.read_scalar_queries import read_room_id_from_room_guid
from chalicelib.data.queries.update_song import update_song
from chalicelib.models import Song
from chalicelib.models.spotify_api.track import SpotifyTrackFormatted
from chalicelib.services.exceptions import RoomNotFoundServiceError


def _compare_songs(song: SpotifyTrackFormatted, song_in_db: Song) -> None:
    song_in_db_dict = {k: song_in_db.__dict__[k] for k in ["song_uri", "song_name", "song_artist", "song_album_url"]}
    song_dict = asdict(song)
    if song_dict != song_in_db_dict:
        # if spotify changed any info about the song, update our db
        song_dict["last_accessed"] = datetime.datetime.now()
        update_song(song_dict)
    else:
        # update the last time this song was added
        update_song({"song_uri": song_dict["song_uri"], "last_accessed": datetime.datetime.now()})


def _get_new_song(song: SpotifyTrackFormatted) -> Song:
    try:
        song_in_db = get_song_from_song_uri(song.song_uri)
        _compare_songs(song, song_in_db)
        return song_in_db
    except SongNotFoundDbError:
        create_song(song)
        return get_song_from_song_uri(song.song_uri)


def add_song_to_room_queue(song: SpotifyTrackFormatted, room_guid: str) -> None:
    room_id = read_room_id_from_room_guid(room_guid)
    if not room_id:
        raise RoomNotFoundServiceError(room_guid)
    new_song = _get_new_song(song)
    create_room_song(room_id, new_song)
