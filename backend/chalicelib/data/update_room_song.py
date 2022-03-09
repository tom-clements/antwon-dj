from sqlalchemy.orm import session
from sqlalchemy.util import namedtuple

from chalicelib.models import RoomSong
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def update_added_to_playlist(next_song: namedtuple, db_session: session):
    db_session.query(RoomSong).filter(RoomSong.room_song_id == next_song["room_song_id"]).update(
        {RoomSong.is_added_to_playlist: True}, synchronize_session=False
    )


@use_db_session(commit=True)
def update_played(next_song: namedtuple, db_session: session):
    db_session.query(RoomSong).filter(RoomSong.room_song_id == next_song["room_song_id"]).update(
        {RoomSong.is_played: True}, synchronize_session=False
    )
