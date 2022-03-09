from typing import List

from sqlalchemy import String, cast, false
from sqlalchemy.engine import Row
from sqlalchemy.orm import session

from chalicelib.models import RoomSong, Song, Room
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_room_queue(room_guid: str, db_session: session) -> List[Row]:
    room_queue = (
        db_session.query(
            RoomSong.room_song_guid,
            Song.song_uri,
            Song.song_name,
            Song.song_artist,
            Song.song_album_url,
            RoomSong.is_inactive,
            cast(RoomSong.insert_time, String).label("insert_time"),
            RoomSong.is_played,
            RoomSong.is_removed,
        )
        .join(Song)
        .join(Room)
        .filter(RoomSong.is_played == false(), Room.room_guid == room_guid)
        .all()
    )
    return room_queue


@use_db_session()
def read_last_five_played_tracked(room_guid: str, db_session: session) -> List[str]:
    result = (
        db_session.query(Song.song_uri)
        .join(RoomSong)
        .join(Room)
        .filter(Room.room_guid == room_guid)
        .order_by(RoomSong.insert_time.desc())
        .limit(5)
        .all()
    )
    return [r.song_uri for r in result]
