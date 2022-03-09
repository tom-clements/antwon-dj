import datetime
from typing import Dict, Any

from sqlalchemy.exc import NoResultFound

from chalicelib.data.create_room_song import create_room_song
from chalicelib.data.create_song import create_song
from chalicelib.data.read_one_queries import get_song_from_song_uri
from chalicelib.data.read_scalar_queries import get_room_id_from_room_guid
from chalicelib.data.update_song import update_song
from chalicelib.models import Song


def compare_songs(song: Dict[str, Any], song_in_db: Song) -> None:
    song_in_db = {k: song_in_db.__dict__[k] for k in ["song_uri", "song_name", "song_artist", "song_album_url"]}
    if song != song_in_db:
        # if spotify changed any info about the song, update our db
        song["last_accessed"] = datetime.datetime.now()
        update_song(song)
    else:
        # update the last time this song was added
        update_song({"song_uri": song["song_uri"], "last_accessed": datetime.datetime.now()})


def get_new_song(song: Dict[str, Any]) -> Song:
    try:
        song_in_db = get_song_from_song_uri(song["song_uri"])
        compare_songs(song, song_in_db)
        return song_in_db
    except NoResultFound:
        create_song(song)
        return get_song_from_song_uri(song["song_uri"])


def add_song_to_room_queue(song: Dict[str, Any], room_guid: str) -> None:
    room_id = get_room_id_from_room_guid(room_guid)
    new_song = get_new_song(song)
    create_room_song(room_id, new_song)
