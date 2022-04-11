from sqlalchemy.orm import Session

from chalicelib.models import RoomSongLike
from chalicelib.services.auth.db import use_db_session


@use_db_session(commit=True)
def delete_like(room_song_id: int, user_id: int, db_session: Session) -> None:
    db_session.query(RoomSongLike).filter(
        RoomSongLike.room_song_id == room_song_id, RoomSongLike.user_id == user_id
    ).delete()
