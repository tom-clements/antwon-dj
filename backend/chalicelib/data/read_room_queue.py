from typing import List

from sqlalchemy import String, cast, false
from sqlalchemy.orm import Session

from chalicelib.models import RoomSong, Song, Room
from chalicelib.models.data_queries.queue_song import QueueSong
from chalicelib.services.auth.db import use_db_session


@use_db_session()
def read_room_queue(room_guid: str, db_session: Session) -> List[QueueSong]:
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
    return [QueueSong(**r) for r in room_queue]


@use_db_session()
def read_last_five_played_tracked(room_guid: str, db_session: Session) -> List[str]:
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
