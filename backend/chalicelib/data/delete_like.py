from sqlalchemy.orm import session

from chalicelib.models import RoomSongLike
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def delete_like(room_song_id: int, user_id: int, db_session: session):
    db_session.query(RoomSongLike).filter(
        RoomSongLike.room_song_id == room_song_id, RoomSongLike.user_id == user_id
    ).delete()
