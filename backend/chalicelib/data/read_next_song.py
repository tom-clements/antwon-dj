from typing import Optional

from sqlalchemy import false
from sqlalchemy.orm import Session

from chalicelib.models import RoomSong, Song, Room
from chalicelib.models.data_queries.next_song import NextSong
from chalicelib.services.auth import db


@db.use_db_session()
def read_next_song(room_guid: str, db_session: Session) -> Optional[NextSong]:
    next_song = (
        db_session.query(
            RoomSong.room_song_id,
            Song.song_uri,
            RoomSong.is_added_to_playlist,
            Song.song_name,
            Song.song_artist,
            RoomSong.is_played,
        )
        .join(Song)
        .join(Room)
        .filter(RoomSong.is_played == false(), Room.room_guid == room_guid)
        .order_by(RoomSong.insert_time)
        .first()
    )
    return NextSong(**next_song) if next_song else None
