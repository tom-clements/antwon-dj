import datetime
import uuid

from sqlalchemy.orm import session

from chalicelib.models import RoomSong, Song
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def create_room_song(room_id: int, new_song: Song, db_session: session):
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
