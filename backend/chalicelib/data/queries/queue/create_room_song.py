import datetime
import uuid

from sqlalchemy.orm import Session

from chalicelib.models import RoomSong, Song
from chalicelib.data.db import use_db_session


@use_db_session(commit=True)
def create_room_song(room_id: int, new_song: Song, db_session: Session) -> None:
    db_session.add(
        RoomSong(
            room_song_guid=str(uuid.uuid4()),
            room_id=room_id,
            song_id=new_song.song_id,
            is_inactive=False,
            insert_time=datetime.datetime.now(),
            is_played=False,
            is_removed=False,
            is_added_to_playlist=False,
        )
    )
