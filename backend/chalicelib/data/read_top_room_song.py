from typing import Dict, Any

from sqlalchemy import false
from sqlalchemy.orm import session

from chalicelib.models import RoomSong, Song, Room
from chalicelib.services.auth import db


@db.use_db_session()
def read_top_room_song(room_guid: str, db_session: session) -> Dict[str, Any]:
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
    return dict(next_song) if next_song else None
